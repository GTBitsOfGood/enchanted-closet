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
          csvStream.write({Event: eventInfo.name, Role: 'Volunteer', Name: (userInfo.firstName + ' ' + userInfo.lastName), Email: userInfo.email, Attended: 'Yes'});
        else
          csvStream.write({Event: eventInfo.name, Role: 'Volunteer', Name: (userInfo.firstName + ' ' + userInfo.lastName), Email: userInfo.email, Attended: 'No'});
      });
      eventInfo.participants.forEach((u, ind2, users) => {
	const userInfo = u;
	if (eventInfo.participantsAttended.find(id => u._id.toString() === id.toString()))
          csvStream.write({Event: eventInfo.name, Role: 'Participant', Name: (userInfo.firstName + ' ' + userInfo.lastName), Email: userInfo.email, Attended: 'Yes'});
        else
          csvStream.write({Event: eventInfo.name, Role: 'Participant', Name: (userInfo.firstName + ' ' + userInfo.lastName), Email: userInfo.email, Attended: 'No'});
      });
      csvStream.end();
    });
}

module.exports.yearReport = (req, res, next) => {
  const csvStream = csv.createWriteStream({headers: true});
  res.setHeader('Content-disposition', 'attachment; filename=year.csv');
  res.setHeader("Content-Type", "text/csv");
  csvStream.pipe(res);
  const currentYear = new Date().getFullYear();
  const minimumDate = new Date();
  minimumDate.setFullYear(currentYear, 0, 1);

  const maximumDate = new Date(Date.now() + (24 * 60 * 60 * 1000));
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
            csvStream.write({Event: e.name, Role: 'Volunteer', Name: (userInfo.firstName + ' ' + userInfo.lastName), Email: userInfo.email, Attended: 'Yes'});
          else
            csvStream.write({Event: e.name, Role: 'Volunteer', Name: (userInfo.firstName + ' ' + userInfo.lastName), Email: userInfo.email, Attended: 'No'});
        });
        e.participants.forEach(u => {
	  const userInfo = u;
	  if (e.participantsAttended.find(id => u._id.toString() === id.toString()))
            csvStream.write({Event: e.name, Role: 'Participant', Name: (userInfo.firstName + ' ' + userInfo.lastName), Email: userInfo.email, Attended: 'Yes'});
          else
            csvStream.write({Event: e.name, Role: 'Participant', Name: (userInfo.firstName + ' ' + userInfo.lastName), Email: userInfo.email, Attended: 'No'});
        });
      });
      csvStream.end();
    });
}


