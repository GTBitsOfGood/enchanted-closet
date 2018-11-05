"use strict";

var bcrypt = require('bcrypt');

var mongoose = require('mongoose'); // const Event = mongoose.model('event');


var UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    index: true
  },
  lastName: {
    type: String,
    index: true
  },
  email: {
    type: String,
    index: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    index: true
  },
  role: {
    type: String,
    enum: ['Participant', 'Volunteer', 'Admin'],
    index: true,
    default: 'Participant',
    required: true
  },
  birthday: Date,
  grade: String,
  age: Number,
  race: String,
  school: String,
  leader: String,
  emergencyContactName: String,
  emergencyContactPhone: String,
  emergencyContactRelation: String,
  image: String,
  events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }],
  pendingEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }],
  deniedEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }]
}, {
  usePushEach: true
});

UserSchema.methods.toJSON = function () {
  var usr = this.toObject();
  delete usr.password;
  return usr;
};

UserSchema.methods.validatePassword = function (password) {
  var user = this.toObject();
  return new Promise(function (resolve, reject) {
    bcrypt.compare(password, user.password, function (err, authenticated) {
      if (err) return reject(err);

      if (authenticated) {
        // This is a hack to make sure we don't create a reference, but instead literally copy the object
        var temporaryUser = JSON.parse(JSON.stringify(user));
        delete temporaryUser.password;
        return resolve(temporaryUser);
      } else {
        return reject('Incorrect email/password combination');
      }
    });
  });
};

var User = mongoose.model('User', UserSchema);
module.exports = User;