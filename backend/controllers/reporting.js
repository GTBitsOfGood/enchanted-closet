const fs = require('fs');
const csv = require('fast-csv');
const Event = require('mongoose').model('Event');
const User = require('mongoose').model('User');
const async = require('async');

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
    Event
        .findById(req.params.id)
        .populate('participants')
        .exec((err, eventInfo) => {
            if (err) {
                res.locals.error = {
                    status: 404,
                    msg: 'Could not find event id'
                };
                return next();
            }
            async.each(eventInfo.participants, (e, cb) => {
                User.findById(e._id, (err, userInfo) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    csvStream.write({Name: userInfo.name, Email: userInfo.email});
                    cb(null);
                });
            }, (err, res) => {
                csvStream.end();
            });
        });
}
