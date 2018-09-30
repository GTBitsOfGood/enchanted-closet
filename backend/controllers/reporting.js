const csv = require('fast-csv');
const Event = require('mongoose').model('Event');
const User = require('mongoose').model('User');
const async = require('async');

module.exports.index = (req, res, next) => {
  Event.find({}).sort({datetime: 1}).limit(1).exec((err, event) => {
    if (event) {
      res.locals.data = {
        datetime: event[0].datetime
      };
      return next();
    } else {
      res.locals.error = {
        msg: 'There are no events in the database',
        status: 404
      }
      return next();
    }
  });
}

module.exports.eventReport = (req, res, next) => {
  if (!req.params.id) {
    res.locals.error = {
      status: 404,
      msg: 'Missing parameter: id'
    };
    return next();
  }
  let csvStream = csv.createWriteStream({
    headers: true
  });
  res.setHeader("content-type", "text/csv");
  csvStream.pipe(res);
  Event
    .findById(req.params.id)
    .populate('participants')
    .populate('volunteers')
    .exec((err, eventInfo) => {
      if (err) {
        res.locals.error = {
          status: 404,
          msg: 'Could not find event id'
        };
        csvStream.end();
        return next();
      }
      res.setHeader('Content-disposition', "attachment; filename=" + eventInfo.name + ".csv");
      eventInfo.volunteers.forEach(v => {
        const userInfo = v;
        if (eventInfo.volunteersAttended.find(id => v._id.toString() === id.toString()))
          csvStream.write({
            Event: eventInfo.name,
            Role: 'Volunteer',
            Name: (userInfo.firstName + ' ' + userInfo.lastName),
            Email: userInfo.email,
            Attended: 'Yes'
          });
        else
          csvStream.write({
            Event: eventInfo.name,
            Role: 'Volunteer',
            Name: (userInfo.firstName + ' ' + userInfo.lastName),
            Email: userInfo.email,
            Attended: 'No'
          });
      });
      eventInfo.participants.forEach((u, ind2, users) => {
        const userInfo = u;
        if (eventInfo.participantsAttended.find(id => u._id.toString() === id.toString()))
          csvStream.write({
            Event: eventInfo.name,
            Role: 'Participant',
            Name: (userInfo.firstName + ' ' + userInfo.lastName),
            Email: userInfo.email,
            Attended: 'Yes'
          });
        else
          csvStream.write({
            Event: eventInfo.name,
            Role: 'Participant',
            Name: (userInfo.firstName + ' ' + userInfo.lastName),
            Email: userInfo.email,
            Attended: 'No'
          });
      });
      csvStream.end();
    });
}

module.exports.yearReport = (req, res, next) => {
  if (!req.params.year) {
    res.locals.error = {
      status: 404,
      msg: 'Missing parameter: year'
    };
    return next();
  }
  const csvStream = csv.createWriteStream({
    headers: true
  });
  const year = req.params.year;
  res.setHeader('Content-disposition', 'attachment; filename=' + year + '-report.csv');
  res.setHeader("Content-Type", "text/csv");
  csvStream.pipe(res);
  
  const currYear = new Date().getFullYear();
  const minimumDate = new Date();
  minimumDate.setFullYear(year, 0, 1);
  console.log('minimum date: ', minimumDate);

  let maximumDate;
  if (year === currYear) {
    maximumDate = new Date(Date.now() + (24 * 60 * 60 * 1000));
  } else {
    maximumDate = new Date()
    maximumDate.setFullYear(year, 11, 31);
  }
  console.log('max date: ', maximumDate);

  // maximumDate.setFullYear(currentYear, new Date().getMonth(), new Date().getDate()); // Don't go into the future
  // const plusOne = new Date();
  // plusOne.setDate(maximumDate.getDate() + 1);
  let reportMap = [];
  let userList = [];
  User
    .find({
      role: 'Participant'
    }, (err, users) => {
      if (err) {
        res.locals.error = {
          status: 404,
          msg: 'No users could be found'
        };
        csvStream.end();
        return next();
      }
    });

  Event
    .find({
      datetime: {
        $lte: maximumDate,
        $gt: minimumDate
      }
    })
    .populate('participants')
    //    .populate('participantsAttended')
    .populate('volunteers')
    //    .populate('volunteerAttended')
    .exec((err, events) => {
      if (err) {
        res.locals.error = {
          status: 404,
          msg: 'No events could be found for this current year'
        };
        return next();
      }
      let count = 0;
      events.forEach(e => {
        e.volunteers.forEach(v => {
          const userInfo = v; //
          if (e.volunteersAttended.find(id => v._id.toString() === id.toString()))
            csvStream.write({
              Event: e.name,
              Role: 'Volunteer',
              Name: (userInfo.firstName + ' ' + userInfo.lastName),
              Email: userInfo.email,
              Attended: 'Yes'
            });
          else
            csvStream.write({
              Event: e.name,
              Role: 'Volunteer',
              Name: (userInfo.firstName + ' ' + userInfo.lastName),
              Email: userInfo.email,
              Attended: 'No'
            });
        });
        e.participants.forEach(u => {
          const userInfo = u;
          if (e.participantsAttended.find(id => u._id.toString() === id.toString()))
            csvStream.write({
              Event: e.name,
              Role: 'Participant',
              Name: (userInfo.firstName + ' ' + userInfo.lastName),
              Email: userInfo.email,
              Attended: 'Yes'
            });
          else
            csvStream.write({
              Event: e.name,
              Role: 'Participant',
              Name: (userInfo.firstName + ' ' + userInfo.lastName),
              Email: userInfo.email,
              Attended: 'No'
            });
        });
      });
      csvStream.end();
    });
}

module.exports.monthReport = (req, res, next) => {
    if (!req.params.year) {
      res.locals.error = {
        status: 404,
        msg: 'Missing parameter: id'
      };
      return next();
    }
    if (!req.params.month) {
      res.locals.error = {
        status: 404,
        msg: 'Missing parameter: month'
      }
    }
    const csvStream = csv.createWriteStream({
      headers: true
    });
    res.setHeader('Content-disposition', 'attachment; filename=year.csv');
    res.setHeader("Content-Type", "text/csv");
    csvStream.pipe(res);
    const year = req.params.year;
    const month = req.params.month;
    const currentYear = new Date().getFullYear();
    const minimumDate = new Date();
    minimumDate.setFullYear(year, month, 1);

    let maximumDate = undefined;
    if (year === currentYear) {
      const currentMonth = new Date().getMonth();
      if (month === currentMonth) {
        console.log('month: ', month)
        maximumDate = new Date(Date.now() + (24 * 60 * 60 * 1000));
      }
    } else {
      const numberOfDays = new Date(year, month + 1, 0).getDate() // month needs to be indexed starting at 1 since days are 0
      console.log('days: ', numberOfDays)
      maximumDate = new Date();
      maximumDate.setFullYear(year, month, numberOfDays);
      console.log(maximumDate);
    }

    let reportMap = [];
    let userList = [];
    User
      .find({
        role: 'Participant'
      }, (err, users) => {
        if (err) {
          res.locals.error = {
            status: 404,
            msg: 'No users could be found'
          };
          csvStream.end();
          return next();
        }
      });

    Event
      .find({
        datetime: {
          $lte: maximumDate,
          $gt: minimumDate
        }
      })
      .populate('participants')
      //    .populate('participantsAttended')
      .populate('volunteers')
      //    .populate('volunteerAttended')
      .exec((err, events) => {
          if (err) {
            res.locals.error = {
              status: 404,
              msg: 'No events could be found for this current year'
            };
            return next();
          }
          let count = 0;
          events.forEach(e => {
            e.volunteers.forEach(v => {
              const userInfo = v; //
              if (e.volunteersAttended.find(id => v._id.toString() === id.toString()))
                csvStream.write({
                  Event: e.name,
                  Role: 'Volunteer',
                  Name: (userInfo.firstName + ' ' + userInfo.lastName),
                  Email: userInfo.email,
                  Attended: 'Yes'
                });
              else
                csvStream.write({
                  Event: e.name,
                  Role: 'Volunteer',
                  Name: (userInfo.firstName + ' ' + userInfo.lastName),
                  Email: userInfo.email,
                  Attended: 'No'
                });
            });
            e.participants.forEach(u => {
              const userInfo = u;
              if (e.participantsAttended.find(id => u._id.toString() === id.toString()))
                csvStream.write({
                  Event: e.name,
                  Role: 'Participant',
                  Name: (userInfo.firstName + ' ' + userInfo.lastName),
                  Email: userInfo.email,
                  Attended: 'Yes'
                });
              else
                csvStream.write({
                  Event: e.name,
                  Role: 'Participant',
                  Name: (userInfo.firstName + ' ' + userInfo.lastName),
                  Email: userInfo.email,
                  Attended: 'No'
                });
            });
          });
          csvStream.end();
        });
      }