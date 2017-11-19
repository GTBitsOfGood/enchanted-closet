const Event = require('mongoose').model('Event');
const auth = require('../auth');

module.exports.index = (req, res, next) => {
    Event.find({}, (err, events) => {
        if (events) {
            res.locals.data = {
                events: events
            };
            return next();
        } else {
            res.locals.error = {
                msg: 'There are no Events listed in the database',
                status: 404
            };
            return next();
        }
    });
}

module.exports.get = (req, res, next) => {
    if (!req.params.id) {
        res.locals.error = {
            status: 404,
            msg: 'That Event was not found in the database'
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

module.exports.create = (req, res, next) => {
    let token = req.header("Authorization");
    if (token && token.split(" ").length == 2) {
        token = token.split(" ")[1];
    }
    if (!auth.isAdmin(auth.currentUser(token))) {
        res.locals.error = {
            status: 403,
            msg: 'Not authorized to modify events'
        };
        return next();
    }
    if (!req.body.name) {
        res.locals.error = {
            status: 400,
            msg: 'Name field is required'
        };
        return next();
    }

    if (!req.body.description) {
        res.locals.error = {
            status: 400,
            msg: 'Description field is required'
        };
        return next();
    }

    if (!req.body.address) {
        res.locals.error = {
            status: 400,
            msg: 'Address field is required'
        };
        return next();
    }

    if (!req.body.datetime) {
        res.locals.error = {
            status: 400,
            msg: 'Date & Time field is required'
        };
        return next();
    }

    Event.create({
        name: req.body.name,
        description: req.body.description,
        location: req.body.address,
        datetime: req.body.datetime
    }, (err, result) => {
        if (err) {
            res.locals.error = {
                status: 500,
                msg: 'An error occurred while saving that event'
            };
            return next();
        } else {
            res.locals.data = {
                event: result
            }
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
            msg: 'Not authorized to modify events'
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

    Event.findOne({
        _id: req.params.id
    }).remove((err, event) => {
        if (event) {
            res.locals.data = {}
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