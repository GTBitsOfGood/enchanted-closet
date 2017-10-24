const Event = require('mongoose').model('Event');
const User = require('mongoose').model('Participant');

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

module.exports.markPresentAt = (req, res, next) => {
    if (!req.params.eventId) {
        res.locals.error = {
            status: 404,
            msg: 'Missing parameter: eventId'
        };
        return next();
    }
    if (!req.params.userId) {
        res.locals.error = {
            status: 404,
            msg: 'Missing parameter: userId'
        };
        return next();
    }
    User.count({_id: userID}, function (err, count){ 
        if (count == 0) {
            res.locals.error = {
                status: 404,
                msg: 'User does not exist'
            };
            return next();
        }
    }); 
    Event.findById(req.params.eventId, function(err, item){
        if (err) {
            res.locals.error = {
                status: 404,
                msg: 'That Event was not found in the database'
            };
            return next();
        }
        item.attendees.push(req.params.userId);
        item.save();
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

module.exports.delete = (req, res, next) => {
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