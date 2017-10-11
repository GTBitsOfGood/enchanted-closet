const Event = require('mongoose').model('event');

module.exports.index = (req, res) => {
    Event.find({}, (err, events) => {
        if (events) {
            res.json({
                status: 'ok',
                events: events
            });
        } else {
            res.status(404).json({
                status: 'error',
                msg: 'There are no Events listed in the database'
            });
        }
    });
}

module.exports.get = (req, res) => {
    if (!req.params.id) {
        return res.send('missing id');
    }

    Event.find({
        _id: req.params.id
    }, (err, event) => {
        if (event && event.length > 0) {
            res.json({
                status: 'ok', 
                event: event[0]
            });
        } else {
            res.status(404).json({
                status: 'error',
                msg: 'That Event was not found in the database'
            });
        }
    });
}