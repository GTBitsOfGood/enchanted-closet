"use strict";

const mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
  name: {
    type: String,
    index: false,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  registrationStart: {
    type: Date
  },
  registrationEnd: {
    type: Date
  },
  location: {
    type: String,
    required: true
  },
  speakers: {
    type: [String],
    required: false
  },
  photo: {
    type: String,
    required: false
  },
  participants: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  volunteers: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  pendingVolunteers: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  deniedVolunteers: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  participantsAttended: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  volunteersAttended: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  image: {
    type: String,
    required: false
    /*
    images: {
      type: [String]
    },
    imagedescriptions: {
      type: [String]
    }
    */

  }
}, {
  usePushEach: true
});
var Event = mongoose.model('Event', EventSchema);
module.exports = Event;