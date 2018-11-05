"use strict";

var csv = require('fast-csv');

var Event = require('mongoose').model('Event');

var User = require('mongoose').model('User');

var async = require('async');

module.exports.index = function (req, res, next) {
  Event.find({}).sort({
    datetime: 1
  }).limit(1).exec(function (err, event) {
    if (event) {
      res.locals.data = {
        datetime: event[0].datetime
      };
      return next();
    } else {
      console.error(err);
      res.locals.error = {
        msg: 'There are no events in the database',
        status: 404
      };
      return next();
    }
  });
};

module.exports.eventReport = function (req, res, next) {
  if (!req.params.id) {
    res.locals.error = {
      status: 404,
      msg: 'Missing parameter: id'
    };
    return next();
  }

  var csvStream = csv.createWriteStream({
    headers: true
  });
  res.setHeader('content-type', 'text/csv');
  csvStream.pipe(res);
  Event.findById(req.params.id).populate('participants').populate('volunteers').exec(function (err, eventInfo) {
    if (err) {
      res.locals.error = {
        status: 404,
        msg: 'Could not find event id'
      };
      csvStream.end();
      return next();
    }

    res.setHeader('Content-disposition', 'attachment; filename=' + eventInfo.name + '.csv');
    eventInfo.volunteers.forEach(function (v) {
      var userInfo = v;

      if (eventInfo.volunteersAttended.find(function (id) {
        return v._id.toString() === id.toString();
      })) {
        csvStream.write({
          Event: eventInfo.name,
          Role: 'Volunteer',
          Name: userInfo.firstName + ' ' + userInfo.lastName,
          Email: userInfo.email,
          Attended: 'Yes'
        });
      } else {
        csvStream.write({
          Event: eventInfo.name,
          Role: 'Volunteer',
          Name: userInfo.firstName + ' ' + userInfo.lastName,
          Email: userInfo.email,
          Attended: 'No'
        });
      }
    });
    eventInfo.participants.forEach(function (u, ind2, users) {
      var userInfo = u;

      if (eventInfo.participantsAttended.find(function (id) {
        return u._id.toString() === id.toString();
      })) {
        csvStream.write({
          Event: eventInfo.name,
          Role: 'Participant',
          Name: userInfo.firstName + ' ' + userInfo.lastName,
          Email: userInfo.email,
          Attended: 'Yes'
        });
      } else {
        csvStream.write({
          Event: eventInfo.name,
          Role: 'Participant',
          Name: userInfo.firstName + ' ' + userInfo.lastName,
          Email: userInfo.email,
          Attended: 'No'
        });
      }
    });
    csvStream.end();
  });
};

module.exports.yearReport = function (req, res, next) {
  if (!req.params.year) {
    res.locals.error = {
      status: 404,
      msg: 'Missing parameter: year'
    };
    return next();
  }

  var csvStream = csv.createWriteStream({
    headers: true
  });
  var year = req.params.year;
  res.setHeader('Content-disposition', 'attachment; filename=' + year + '-report.csv');
  res.setHeader('Content-Type', 'text/csv');
  csvStream.pipe(res);
  var currYear = new Date().getFullYear();
  var minimumDate = new Date();
  minimumDate.setFullYear(year, 0, 1);
  var maximumDate;

  if (year === currYear) {
    maximumDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
  } else {
    maximumDate = new Date();
    maximumDate.setFullYear(year, 11, 31);
  }

  Event.find({
    datetime: {
      $lte: maximumDate,
      $gt: minimumDate
    }
  }).populate('participants') //    .populate('participantsAttended')
  .populate('volunteers') //    .populate('volunteerAttended')
  .exec(function (err, events) {
    if (err || events.length === 0) {
      res.locals.error = {
        status: 404,
        msg: 'No events could be found for ' + year
      };
      return next();
    }

    var count = 0;
    events.forEach(function (e) {
      if (e.volunteersAttended.length !== 0) {
        e.volunteers.forEach(function (v) {
          var userInfo = v; //

          if (e.volunteersAttended.find(function (id) {
            return v._id.toString() === id.toString();
          })) {
            csvStream.write({
              Event: e.name,
              Role: 'Volunteer',
              Name: userInfo.firstName + ' ' + userInfo.lastName,
              Email: userInfo.email,
              Attended: 'Yes'
            });
          } else {
            csvStream.write({
              Event: e.name,
              Role: 'Volunteer',
              Name: userInfo.firstName + ' ' + userInfo.lastName,
              Email: userInfo.email,
              Attended: 'No'
            });
          }
        });
      }

      if (e.participantsAttended.length !== 0) {
        e.participants.forEach(function (u) {
          var userInfo = u;

          if (e.participantsAttended.find(function (id) {
            return u._id.toString() === id.toString();
          })) {
            csvStream.write({
              Event: e.name,
              Role: 'Participant',
              Name: userInfo.firstName + ' ' + userInfo.lastName,
              Email: userInfo.email,
              Attended: 'Yes'
            });
          } else {
            csvStream.write({
              Event: e.name,
              Role: 'Participant',
              Name: userInfo.firstName + ' ' + userInfo.lastName,
              Email: userInfo.email,
              Attended: 'No'
            });
          }
        });
      }
    });
    csvStream.end();
  });
};

module.exports.monthReport = function (req, res, next) {
  if (!req.params.year) {
    res.locals.error = {
      status: 404,
      msg: 'Missing parameter: year'
    };
    return next();
  }

  if (!req.params.month) {
    res.locals.error = {
      status: 404,
      msg: 'Missing parameter: month'
    };
  }

  var csvStream = csv.createWriteStream({
    headers: true
  });
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var year = req.params.year;
  var month = req.params.month;
  res.setHeader('Content-disposition', 'attachment; filename=' + months[month] + '-' + year + '-report.csv');
  res.setHeader('Content-Type', 'text/csv');
  csvStream.pipe(res);
  var currentYear = new Date().getFullYear();
  var minimumDate = new Date();
  minimumDate.setFullYear(year, month, 1);
  var maximumDate;

  if (year === currentYear) {
    var currentMonth = new Date().getMonth();

    if (month === currentMonth) {
      maximumDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
    }
  } else {
    var numberOfDays = new Date(year, month + 1, 0).getDate(); // month needs to be indexed starting at 1 since days are 0

    maximumDate = new Date();
    maximumDate.setFullYear(year, month, numberOfDays);
  }

  Event.find({
    startTime: {
      $lte: maximumDate,
      $gte: minimumDate
    }
  }).populate('participants') //    .populate('participantsAttended')
  .populate('volunteers') //    .populate('volunteerAttended')
  .exec(function (err, events) {
    if (err || events.length === 0) {
      res.locals.error = {
        status: 404,
        msg: 'No events could be found for ' + months[month] + ' ' + year
      };
      return next();
    }

    var count = 0;
    events.forEach(function (e) {
      e.volunteers.forEach(function (v) {
        var userInfo = v; //

        if (e.volunteersAttended.find(function (id) {
          return v._id.toString() === id.toString();
        })) {
          csvStream.write({
            Event: e.name,
            Role: 'Volunteer',
            Name: userInfo.firstName + ' ' + userInfo.lastName,
            Email: userInfo.email,
            Attended: 'Yes'
          });
        } else {
          csvStream.write({
            Event: e.name,
            Role: 'Volunteer',
            Name: userInfo.firstName + ' ' + userInfo.lastName,
            Email: userInfo.email,
            Attended: 'No'
          });
        }
      });
      e.participants.forEach(function (u) {
        var userInfo = u;

        if (e.participantsAttended.find(function (id) {
          return u._id.toString() === id.toString();
        })) {
          csvStream.write({
            Event: e.name,
            Role: 'Participant',
            Name: userInfo.firstName + ' ' + userInfo.lastName,
            Email: userInfo.email,
            Attended: 'Yes'
          });
        } else {
          csvStream.write({
            Event: e.name,
            Role: 'Participant',
            Name: userInfo.firstName + ' ' + userInfo.lastName,
            Email: userInfo.email,
            Attended: 'No'
          });
        }
      });
    });
    csvStream.end();
  });
};