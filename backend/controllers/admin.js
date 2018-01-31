const mongoose = require('mongoose');
const User = mongoose.model('User');
const Event = mongoose.model('Event');
const async = require('async');

module.exports.cards = (req, res, next) => {
  let userCounts  = {
    participant: 0,
    volunteer: 0,
    admin: 0
  };
  async.parallel({
    users: cb => {
      User
	.find({})
	.then(users => users.map(u => userCounts[u.role.toLowerCase()]++))
	.then(() => cb(null, userCounts))
	.catch(err => cb(err, null));
    },
    events: cb => {
      Event
	.find({})
	.then(events => cb(null, events.length))
	.catch(err => cb(err, null));
    }
  }, (err, results) => {
    if (err) {
      res.locals.errors = {
	code: 500,
	msg: err
      };
      return next();
    }

    res.locals.data = {
      cards: results
    };
    return next();
  })
}
