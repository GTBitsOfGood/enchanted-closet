const Event = require('mongoose').model('Event');

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

module.exports.postEvent = (req, res, next) => {
    var event = new Event({
        name: req.body.name,
        description: req.body.description,
        datetime: req.body.datetime,
        location: req.body.location,
        presenters: req.body.presenters,
        photo: req.body.photo
    });
    event.save(function(err, event) {
        if(err) { return next(err)}
        res.json(201, event);
        next();
    });
}

module.exports.put = (req, res, next) => {
    if(!req.params.id) {
        res.local.error = {
            status: 404,
            msg: "The Event was not found in the database"
        };
        return next();
    }
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        Event.findById(req.params.id, function(err, event) {
            if(err) {
                return next(err)
            }
            //save the changes 
            
            res.json(202, event);
            next(); 
        });
    }
}