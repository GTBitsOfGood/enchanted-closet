"use strict";

var bcrypt = require('bcrypt');

var User = require('mongoose').model('User');

module.exports.genNew = function (password) {
  var salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};

module.exports.checkAgainst = function (data, callback) {
  User.findOne({
    email: data.email
  }, function (err, user) {
    if (err) {
      // not found TODO: SAM throw no email
      return callback(err, null);
    }

    if (user) {
      user.validatePassword(data.password).then(function (authenticatedUser) {
        return callback(null, authenticatedUser);
      }).catch(function (error) {
        return callback(error, null);
      });
    } else {
      return callback('Incorrect email/password combination', null);
    }
  });
};