const fs = require('fs');
const csv = require('fast-csv');
const Event = require('mongoose').model('Event');
const User = require('mongoose').model('User');
const async = require('async');

module.exports.eventReport = (req, res, next) => {
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

module.exports.yearReport = (req, res, next) => {
  const csvStream = csv.createWriteStream({headers: true});
  res.setHeader("content-type", "text/csv");
  csvStream.pipe(res);
  const currentYear = new Date().getFullYear();
  const minimumDate = new Date();
  minimumDate.setFullYear(currentYear, 0, 1);

  const maximumDate = new Date();
  maximumDate.setFullYear(currentYear, 11, 31);

  let reportMap = [];

  User
    .find({
      role: 'Participant'
    }, (err, users) => {
      if (err) {
        res.locals.error = {
          status: 404,
          msg: 'No users could be found'
        };
        return next();
      }
    });

  Event
    .find({
      datetime: {
        $lt: maximumDate,
        $gt: minimumDate
      }
    })
    .populate('participants')
    .exec((err, events) => {
      console.log(events);
      if (err) {
        res.locals.error = {
          status: 404,
          msg: 'No events could be found for this current year'
        };
        return next();
      }
      // async.each(eventInfo.participants, (e, cb) => {
      //     User.findById(e._id, (err, userInfo) => {
      //         if (err) {
      //             console.log(err);
      //             return;
      //         }
      //         csvStream.write({Name: userInfo.name, Email: userInfo.email});
      //         cb(null);
      //     });
      // }, (err, res) => {
      //     csvStream.end();
      // });
    });
}
