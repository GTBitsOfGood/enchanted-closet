"use strict";
const User = require('mongoose').model('User');

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

module.exports.get = (req, res, next) => {
    if (!req.params.id) {
        res.locals.error = {
            status: 400,
            msg: 'Event ID required'
        };
        return next();
    }

    Event.findOne({
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
                msg: 'That Event was not found in the database'
            };
            return next();
        }
    });
}