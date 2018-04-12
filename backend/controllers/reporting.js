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
      eventInfo.volunteers.forEach((v, ind, volunteers) => {
          User.findById(v._id, (err, userInfo) => {
            if (err) { 
              console.log(err);
              csvStream.write({Event: 'There was an Error', Role: '', Name: 'NA', Email: 'NA', Attended: 'NA'})
            }
            else if (userInfo){
              if (eventInfo.volunteersAttended.filter(user => { return user._id.toString() === v._id.toString() }).length === 1)
                csvStream.write({Event: eventInfo.name, Role: 'Volunteer', Name: (userInfo.firstName + ' ' + userInfo.lastName), Email: userInfo.email, Attended: 'Yes'});
              else
                csvStream.write({Event: eventInfo.name, Role: 'Volunteer', Name: (userInfo.firstName + ' ' + userInfo.lastName), Email: userInfo.email, Attended: 'No'});
            }
          });
        });
        eventInfo.participants.forEach((u, ind2, users) => {
          User.findById(u._id, (err, userInfo) => {
            if (err) { 
              console.log(err);
              csvStream.write({Event: 'There was an Error', Role: '', Name: 'NA', Email: 'NA', Attended: 'NA'})
            }
            else if (userInfo){
              if (e.participantsAttended.filter(user => { return user._id.toString() === u._id.toString() }).length === 1)
                csvStream.write({Event: eventInfo.name, Role: 'Participant', Name: (userInfo.firstName + ' ' + userInfo.lastName), Email: userInfo.email, Attended: 'Yes'});
              else
                csvStream.write({Event: eventInfo.name, Role: 'Participant', Name: (userInfo.firstName + ' ' + userInfo.lastName), Email: userInfo.email, Attended: 'No'});
            }
            if (ind2 === users.length - 1) {
              csvStream.end();
            }
            
          });
      });  
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

  const maximumDate = new Date();
  maximumDate.setFullYear(currentYear, 11, 31);

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
    .populate('participantsAttended')
    .populate('volunteers')
    .populate('volunteerAttended')
    .exec((err, events) => {
      //console.log(events);
      if (err) {
        res.locals.error = {
          status: 404,
          msg: 'No events could be found for this current year'
        };
        return next();
      }
      let count = 0;
      events.forEach((e, ind1, events) => {
        e.volunteers.forEach((v, indVol, volunteers) => {
          User.findById(v._id, (err, userInfo) => {
            if (err) { 
              console.log(err);
              csvStream.write({Event: 'There was an Error', Role: '', Name: 'NA', Email: 'NA', Attended: 'NA'})
            }
            else if (userInfo){
              if (indVol == 0)
                count++;
              if (e.volunteersAttended.filter(user => { return user._id.toString() === v._id.toString() }).length === 1)
                csvStream.write({Event: e.name, Role: 'Volunteer', Name: (userInfo.firstName + ' ' + userInfo.lastName), Email: userInfo.email, Attended: 'Yes'});
              else
                csvStream.write({Event: e.name, Role: 'Volunteer', Name: (userInfo.firstName + ' ' + userInfo.lastName), Email: userInfo.email, Attended: 'No'});
            }
          });
        });
        e.participants.forEach((u, ind2, users) => {
          User.findById(u._id, (err, userInfo) => {
            if (err) { 
              console.log(err);
              csvStream.write({Event: 'There was an Error', Role: '', Name: 'NA', Email: 'NA', Attended: 'NA'})
            }
            else if (userInfo){
              if (ind2 == 0)
                count++;
              if (e.participantsAttended.filter(user => { return user._id.toString() === u._id.toString() }).length === 1)
                csvStream.write({Event: e.name, Role: 'Participant', Name: (userInfo.firstName + ' ' + userInfo.lastName), Email: userInfo.email, Attended: 'Yes'});
              else
                csvStream.write({Event: e.name, Role: 'Participant', Name: (userInfo.firstName + ' ' + userInfo.lastName), Email: userInfo.email, Attended: 'No'});
            }
            if (count === events.length && ind2 === users.length - 1) {
              csvStream.end();
            }
            
          });
      });  
    });
  });
}


