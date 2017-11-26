"use strict";
const User = require('mongoose').model('User');
const auth = require('../auth');
const hash = require('../hash');

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

module.exports.get = (req, res, next) => {
    if (!req.params.id) {
        res.locals.error = {
            status: 400,
            msg: 'User ID required'
        };
        return next();
    }
    let token = req.header("Authorization");
    if (token && token.split(" ").length == 2) {
        token = token.split(" ")[1];
    }
    if (req.params.id != auth.currentUser(token)) {
        res.locals.error = {
            status: 403,
            msg: 'Not authorized to view other users'
        };
    }

    User.findOne({
        _id: req.params.id
    }, (err, user) => {
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
    let token = req.header("Authorization");
    if (token && token.split(" ").length == 2) {
        token = token.split(" ")[1];
    }
    if (!auth.isAdmin(auth.currentUser(token))) {
        res.locals.error = {
            status: 403,
            msg: 'Not authorized to modify users'
        };
        return next();
    }
    if (!req.params.id) {
        res.locals.error = {
            status: 404,
            msg: 'That Event was not found in the database'
        };
        return next();
    }

    User.findOne({
        _id: req.params.id
    }).remove((err, user) => {
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

module.exports.create = (req, res, next) => {
    if (!req.body.name) {
        res.locals.error = {
            status: 400,
            msg: 'Name field is required'
        };
        return next();
    }

    if (!req.body.email) {
        res.locals.error = {
            status: 400,
            msg: 'Email field is required'
        };
        return next();
    }

    if (!req.body.password) {
        res.locals.error = {
            status: 400,
            msg: 'Password field is required'
        };
        return next();
    }


    if (!req.body.role) {
        res.locals.error = {
            status: 400,
            msg: 'Role field is required'
        };
        return next();
    }

    const formatRole = (role) => {
        if (!role) return null;
        return `${role.charAt(0).toUpperCase()}${role.substr(1).toLowerCase()}`;
    }

    User.findOne({
        email: req.body.email
    }, (err, emailCheck) => {
        if (err) {
            res.locals.error = {
                status: 500,
                msg: 'An error occurred while creating that user'
            };
            return next();
        }

        if (emailCheck) {
            res.locals.error = {
                status: 400,
                msg: 'A user with that email address already exists'
            }
            return next();
        }
        const hashedPassword = hash.genNew(req.body.password);
        User.create({
            name: req.body.name,
            email: req.body.email,
            role: formatRole(req.body.role),
            password: hashedPassword
        }, (err, user) => {
            if (err) {
                res.locals.errors = {
                    status: 500,
                    msg: 'An error occurred while creating that user'
                };
                return next();
            }

            res.locals.data = {
                user: user
            };
            return next();
        });
    });

}
