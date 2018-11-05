"use strict";

var mongoose = require('mongoose');

var User = mongoose.model('User');
var Event = mongoose.model('Event');

var async = require('async');

module.exports.cards = function (req, res, next) {
  var userCounts = {
    participant: 0,
    volunteer: 0,
    admin: 0
  };
  async.parallel({
    users: function users(cb) {
      User.find({}).then(function (users) {
        return users.map(function (u) {
          return userCounts[u.role.toLowerCase()]++;
        });
      }).then(function () {
        return cb(null, userCounts);
      }).catch(function (err) {
        return cb(err, null);
      });
    },
    events: function events(cb) {
      Event.find({}).then(function (events) {
        return cb(null, events.length);
      }).catch(function (err) {
        return cb(err, null);
      });
    }
  }, function (err, results) {
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
  });
};