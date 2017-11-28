"use strict";
const User = require('mongoose').model('User');
const auth = require('../auth');
let isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
let isPhone = /^(\+1 )?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}( x\d{1,5})?$/
let grades = ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const hash = require("../hash");

module.exports.index = (req, res, next) => {
    User
        .find({})
        .populate('pastEvents')
        .exec((err, users) => {
        if (users) {
            res.locals.data = {
                users: users
            };
            return next();
        } else {
            res.locals.error = {
                msg: 'There are no users in the database',
                status: 404
            };
            return next();
        }
    });
}

function lacksAny(obj, props) {
    for (p in props) {
        if (!(obj[p])) {
            return p;
        }
    }
    return false;
}

function matchesComplexityRequirements(password) {
    if (password.length < 7) return false;
    let hasAlpha = false;
    let hasNum = false;
    for (let i = 0; i < password.length; i++) {
        let c = password.charCodeAt(i);
        if ((c >= 65 && c <= 90) || (c >= 97 && c <= 122)) {
            hasAlpha = true;
        } else if (c >= 48 && c <= 57) {
            hasNum = true;
        }
        if (hasAlpha && hasNum) return true;
    }
    return false;
}

let validateUser = (data, callback) => {
    let tmp = lacksAny(data, ["name", "email", "password", "birthday", "grade", "race", "school", "leader_name", "emergency_contact"]);
    if (tmp) {
        return callback({reason: "Data object missing " + tmp + " property"}, false);
    }
    if (data.name.length < 2) {
        return callback({reason: "Name must be at least 3 characters"}, false);
    }
    if (!isEmail.test(data.email)) {
        return callback({reason: "Email invalid"}, false);
    }
    if (!matchesComplexityRequirements(data.password)) {
        return callback({reason: "Password doesn't match complexity requirements"}, false);
    }
    if (grades.indexOf(data.grade) == -1) {
        return callback({reason: "Grade is not valid"}, false);
    }
    //TODO: constraint checks for race, school, leader_name
    if (!isPhone.test(data.emergency_contact.phone)) {
        return callback({reason: "Invalid phone number"}, false);
    }
    return Object.assign({}, data, {"password": hash.genNew(data.password)});
}

let validateAdmin = (data, callback) => {
    let tmp = lacksAny(data, ["email", "password", "name"]);
    if (tmp) {
        return callback({reason: "Data object missing " + tmp + " property"}, false);
    }
    if (!isEmail.test(data.email)) {
        return callback({reason: "Email invalid"}, false);
    }
    if (!matchesComplexityRequirements(data.password)) {
        return callback({reason: "Password doesn't match complexity requirements"}, false);
    }
    if (data.name.length < 2) {
        return callback({reason: "Name must be at least 3 characters"}, false);
    }
    return Object.assign({}, data, {"password": hash.genNew(data.password)});
}

module.exports.register = (req, res, next) => {
    let errResp = (err, success) => {
        if (!success) {
            res.error = {
                status: 400,
                msg: err.reason
            };
        }
    }
    if (req.role == "Participant" || req.role == "Volunteer") {
        let add = validateUser(req.body.data, errResp);
        User.create(add, (err, instance) => {
            if (err) {
                res.locals.error = {
                    status: 500,
                    msg: "Couldn't save user"
                };
            }
            return next();
        });
    } else if (req.role = "Admin") {
        //only admins can create other admins
        let token = req.header("Authorization");
        if (!token.startsWith("Bearer ")) {
            res.locals.error = {
                status: 403,
                msg: 'Not authorized (must be admin)'
            };
            return next();
        }
        token = token.substring(7);
        auth.currentUser(token, (_, curr) => {
            auth.isAdmin(curr, (state) => {
                if (state) {
                    let add = validateAdmin(req.body.data, errResp);
                    User.create(add, (err, instance) => {
                        if (err) {
                            res.locals.error = {
                                status: 500,
                                msg: "Couldn't save user"
                            };
                        }
                        return next();
                    });
                } else {
                    res.locals.error = {
                        status: 403,
                        msg: "Can't register admin"
                    }
                    return next();
                }
            });
        });
    }
}

module.exports.get = (req, res, next) => {
    User
        .findById(req.params.id)
        .populate('pastEvents')
        .exec((err, user) => {
        if (user) {
            res.locals.data = {
                user: user
            };
            return next();
        } else {
            res.locals.error = {
                status: 404,
                msg: 'That user was not found in the database'
            };
            return next();
        }
    });
}

module.exports.delete = (req, res, next) => {
    User.findById(req.params.id).remove((err, user) => {
        if (user) {
            res.locals.data = {}
            return next();
        } else {
            res.locals.error = {
                status: 404,
                msg: 'That user was not found in the database'
            };
            return next();
        }
    });
}

module.exports.update = (req, res, next) => {
    if (!req.params.id) {
        res.locals.error = {
            status: 400,
            msg: 'User ID required'
        };
        return next();
    }
    let newProps = {};
    if (req.body.password) {
        //TODO: verify old password

        let token = req.headers.authorization;
        if (!token.startsWith("Bearer ")) {
            res.locals.error = {
                status: 403,
                msg: 'Not authorized (must be admin)'
            };
            return next(new Error(res.locals.error));
        }
        token = token.substring(7);
        auth.currentUser(token, (_, curr) => {
            if (req.params.id != curr) {
                res.locals.error = {
                    status: 403,
                    msg: 'Not authorized (must be admin)'
                };
                return next(new Error(res.locals.error));
            }
            if (matchesComplexityRequirements(req.body.data[password])) {
                newProps["password"] = hash.genNew(req.body.data.password);
            }
        });
    }
    if (req.body.name && req.body.name.length >= 2) {
        newProps.name = req.body.name;
    }
    //["name", "email", "password", "birthday", "grade", "race", "school", "leader_name", "emergency_contact"]);
    if (req.body.email && isEmail.test(req.body.email)) {
        newProps.email = req.body.email;
    }
    if (req.body.grade && grades.indexOf(req.body.grade != -1)) {
        newProps.grade = req.body.grade;
    }
    if (req.body.phone) {
        newProps.phone = req.body.phone;
    }
    if (req.body.grade && req.body.grade > 0 && req.body.grade <= 12) {
        newProps.grade = req.body.grade;
    }
    if (req.body.race && req.body.race.length > 2) {
        newProps.race = req.body.race;
    }
    if (req.body.school && req.body.school.length > 2) {
        newProps.school = req.body.school;
    }
    if (req.body.emergencyContactName && req.body.emergencyContactName.length > 2) {
        newProps.emergencyContactName = req.body.emergencyContactName;
    }
    if (req.body.emergencyContactPhone && req.body.emergencyContactPhone.length > 2) {
        newProps.emergencyContactPhone = req.body.emergencyContactPhone;
    }
    if (req.body.emergencyContactRelation && req.body.emergencyContactRelation.length > 2) {
        newProps.emergencyContactRelation = req.body.emergencyContactRelation;
    }
    User.findById(req.params.id, (err, doc) => {
        if (err) {
            res.locals.error = {
                status: 404,
                msg: "User not found with desired ID"
            }
            return next(new Error(res.locals.error));
        } else {
            doc.set(newProps);
            doc.save((err, updated) => {
                console.log(err)
                if (err) {
                    res.locals.error = {
                        status: 500,
                        msg: "Unable to save changes to db"
                    }
                }
                res.locals.data = {
                    user: updated
                };
                return next();
            });
        }
    });
}
