"use strict";
const User = require('mongoose').model('User');
const auth = require('../auth');
let isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
let isPhone = /^(\+1 )?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}( x\d{1,5})?$/
let grades = ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const hash = require("../hash");

module.exports.index = (req, res, next) => {
    User.find({}, (err, users) => {
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
    User.findById(req.params.id, (err, user) => {
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
    if (req.body.data["password"]) {
        //TODO: verify old password
        
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
            if (req.params.id != curr) {
                return;
            }
            if (matchesComplexityRequirements(req.body.data[password])) {
                newProps["password"] = hash.genNew(req.body.data.password);
            }
        });
    }
    if (req.body.data["name"] && req.body.data["name"].length >= 2) {
        newProps["name"] = req.body.data["name"];
    }
    //["name", "email", "password", "birthday", "grade", "race", "school", "leader_name", "emergency_contact"]);
    if (req.body.data["email"] && isEmail.test(req.body.data["email"])) {
        newProps["email"] = req.body.data["email"];
    }
    if (req.body.data["grade"] && grades.indexOf(req.body.data["grade"] != -1)) {
        newProps["grade"] = req.body.data["grade"];
    }
    User.findById(req.params.id, (err, doc) => {
        if (err) {
            res.locals.error = {
                status: 404,
                msg: "User not found with desired ID"
            }
        } else {
            doc.set(newProps);
            doc.save((err, updated) => {
                if (err) {
                    res.locals.error = {
                        status: 500,
                        msg: "Unable to save changes to db"
                    }
                }
                res.locals.user = updated;
            });
        }
        return next();
    });
}