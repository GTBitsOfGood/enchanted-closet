const fs = require('fs');
const csv = require('fast-csv');
const Event = require('mongoose').model('Event');
const User = require('mongoose').model('User');


module.exports.generateReport = (req, res, next) => {
    if (!req.params.id) {
        res.locals.error = {
            status: 404,
            msg: 'Missing parameter: id'
        };
        return next();
    }
    let csvStream = csv.createWriteStream({headers: true});
    res.setHeader("content-type", "text/csv");
    csvStream.pipe(res);
    Event.findById(req.params.id, (err, eventInfo) => {
        if (err) {
            res.locals.error = {
                status: 404,
                msg: 'Could not find event id'
            };
            return next();
        }
        for (userId in eventInfo.attendees) {
            User.findById(userid, (err, userInfo) => {
                if (err) {
                    //TODO: notify of deleted user
                    return;
                }
                csvStream.write({name: userInfo.name, email: userInfo.email});
            });
        }
    });
    csvStream.end();
}
