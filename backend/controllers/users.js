import { delete } from './events';

"use strict";
const User = require('mongoose').model('User');
const auth = require('../auth');
let isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
let isPhone = /^(\+1 )?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}( x\d{1,5})?$/
let grades = ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

module.exports.index = (req, res, next) => {
    User.find({}, (err, events) => {
        if (events) {
            res.locals.data = {
                events: events
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

function hasAll(obj, props) {
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
    let tmp = hasAll(data, ["name", "email", "password", "birthday", "grade", "race", "school", "leader_name", "emergency_contact"]);
    if (tmp) {
        return callback({reason: "Data object missing " + tmp + " property"}, false);
    }
    if (name.length < 2) {
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
    newHash = hash.genNew(data.password);
    return Object.assign({}, data, {"hash": newHash});
}

let validateAdmin = (data, callback) => {
    let tmp = hasAll(data, ["email", "password", "name"]);
    if (tmp) {
        return callback({reason: "Data object missing " + tmp + " property"}, false);
    }
    if (!isEmail.test(data.email)) {
        return callback({reason: "Email invalid"}, false);
    }
    if (!matchesComplexityRequirements(data.password)) {
        return callback({reason: "Password doesn't match complexity requirements"}, false);
    }
    if (name.length < 2) {
        return callback({reason: "Name must be at least 3 characters"}, false);
    }
    newHash = hash.genNew(data.password);
    return Object.assign({}, data, {"hash": newHash});
}

module.exports.register = (req, res, next) => {
    let errResp = (err, success) => {
        if (!success) {
            res.error = err.reason;
        }
        return next();
    }
    let add = undefined;
    if (req.role == "Participant" || req.role == "Volunteer") {
        add = validateUser(req.body.data, errResp);
    } else if (req.role = "Admin") {
        //only admins can create other admins
        let token = req.header("Authorization");
        if (!token.startsWith("Bearer ")) {
            res.locals.error = {
                status: 403,
                msg: 'Not authorized (must be admin)'
            };
            return next(new Error(res.locals.error));
        }
        token = token.substring(7);
        let curr = auth.currentUser(token);
        if (auth.isAdmin(curr)){
            add = validateAdmin(req.body.data, errResp);
        }
    }
    if (add) {
        delete add.password;
        User.create(add, (err, instance) => {
            if (err) {
                res.locals.error = {
                    status: 500,
                    msg: "Couldn't save user"
                };
            }
        });
    }
    return next();
}

module.exports.get = (req, res, next) => {
    if (!req.params.id) {
        res.locals.error = {
            status: 400,
            msg: 'User ID required'
        };
        return next();
    }
    let token = req.header("Authorization");
    if (!token.startsWith("Bearer ")) {
        res.locals.error = {
            status: 403,
            msg: 'Not authorized (must be admin)'
        };
        return next(new Error(res.locals.error));
    }
    token = token.substring(7);
    let curr = auth.currentUser(token);
    if (!auth.isAdmin(curr) && req.params.id != curr) {
        res.locals.error = {
            status: 403,
            msg: 'Not authorized to view other users'
        };
    }

    User.findOne({
        _id: req.params.id
    }, (err, event) => {
        if (event) {
            res.locals.data = {
                event: event
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
    if (!req.params.id) {
        res.locals.error = {
            status: 400,
            msg: 'User ID required'
        };
        return next();
    }

    User.findOne({
        _id: req.params.id
    }).remove((err, event) => {
        if (event) {
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
    if (req.body.data["password"]) {

    }

}