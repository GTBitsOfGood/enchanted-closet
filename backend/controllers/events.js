const Event = require('mongoose').model('Event');
const User = require('mongoose').model('User')

module.exports.index = (req, res, next) => {
    Event.find({}, (err, events) => {
        if (events) {
            res.locals.data = {
                events: events
            };
            return next();
        } else {
            res.locals.error = {
                msg: 'There are no events in the database',
                status: 404
            };
            return next();
        }
    });
}

module.exports.present = (req, res, next) => {
    if (!req.params.id) {
        res.locals.error = {
            status: 400,
            msg: 'Event ID required'
        };
        return next();
    }
    if (!req.params.userId) {
        res.locals.error = {
            status: 400,
            msg: 'User ID required'
        };
        return next();
    }
    let hadError = false;
    Event.findById(req.params.id, function(err, doc){
        if (err) {
            res.locals.error = {
                status: 404,
                msg: 'That event was not found in the database'
            };
            hadError = true;
            return;
        }
        doc.participants.push(req.params.userId);
        doc.save();
    });
    if (hadError) {
        return next();
    }
    User.findById(req.params.userId, function(err, doc){
        if (err) {
            res.locals.error = {
                status: 404,
                msg: 'That user was not found in the database'
            };
            hadError = true;
            return;
        }
        doc.pastEvents.push(req.params.id);
        doc.save();
    });
    return next();
}

module.exports.absent = (req, res, next) => {
    if (!req.params.id) {
        res.locals.error = {
            status: 400,
            msg: 'Event ID required'
        };
        return next();
    }
    if (!req.params.userId) {
        res.locals.error = {
            status: 400,
            msg: 'User ID required'
        };
        return next();
    }
    let hadError = false;
    Event.findById(req.params.id, function(err, doc){
        if (err) {
            res.locals.error = {
                status: 404,
                msg: 'That event was not found in the database'
            };
            hadError = true;
            return;
        }
        let ind = doc.participants.indexOf(req.params.userId);
        if (ind != -1) {
            doc.participants.splice(ind, 1);
            doc.save();
        }
    });
    if (hadError) {
        return next();
    }
    User.findById(req.params.userId, function(err, doc){
        if (err) {
            res.locals.error = {
                status: 404,
                msg: 'That user was not found in the database'
            };
            hadError = true;
            return;
        }
        let ind = doc.pastEvents.indexOf(req.params.id);
        if (ind != -1) {
            doc.pastEvents.splice(ind, 1);
            doc.save();
        }
    });
    return next();
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

module.exports.create = (req, res, next) => {
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

    if (!req.body.location) {
        res.locals.error = {
            status: 400,
            msg: 'Location field is required'
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
        location: req.body.location,
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
    if (!req.params.id) {
        res.locals.error = {
            status: 400,
            msg: 'Event id required'
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

module.exports.update = (req, res, next) => {
    if (!req.params.id) {
        res.locals.error = {
            status: 404,
            msg: 'That Event was not found in the database'
        };
        return next();
    }

    Event.findById(req.params.id, (err, event) => {
        if (err) {
            console.error(err);
            res.locals.errors = {
                status: 500,
                msg: err
            };
            return next();
        }

        if (!event) {
            res.locals.error = {
                status: 404,
                msg: 'That Event was not found in the database'
            };
            return next();       
        }

        event.name = req.body.name;
        event.description = req.body.description;
        event.location = req.body.location;
        event.datetime = req.body.datetime;

        event.save((err, updatedEvent) => {
            res.locals.data = {
                event: updatedEvent
            };
            return next();
        });
    });
}