"use strict";

var Event = require('mongoose').model('Event');

var User = require('mongoose').model('User');

var async = require('async');

var currDate = new Date();

module.exports.index = function (req, res, next) {
  Event.find({}).populate('participants').populate('volunteers').exec(function (err, events) {
    if (events) {
      res.locals.data = {
        events: events
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

module.exports.fetchFutureEvents = function (req, res, next) {
  Event.find({
    'startTime': {
      $gt: currDate
    }
  }).sort({
    'startTime': 1
  }).populate('participants').populate('volunteers').exec(function (err, events) {
    if (events) {
      res.locals.data = {
        events: events
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

module.exports.fetchPastEvents = function (req, res, next) {
  Event.find({
    'startTime': {
      $lte: currDate
    }
  }).sort({
    'startTime': 1
  }).populate('participants').populate('volunteers').exec(function (err, events) {
    if (events) {
      res.locals.data = {
        events: events
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

module.exports.present = function (req, res, next) {
  if (!req.params.eventID) {
    res.locals.error = {
      status: 400,
      msg: 'Event ID required'
    };
    return next();
  }

  if (!req.params.userID) {
    res.locals.error = {
      status: 400,
      msg: 'User ID required'
    };
    return next();
  }

  Event.findById(req.params.eventID, function (err, eDoc) {
    if (err || !eDoc) {
      res.locals.error = {
        status: 404,
        msg: 'That event was not found in the database'
      };
      return next();
    }

    User.findById(req.params.userID, function (err, uDoc) {
      if (err || !uDoc) {
        res.locals.error = {
          status: 404,
          msg: 'That user was not found in the database'
        };
        return next();
      }

      if (uDoc.role === 'Participant') {
        if (!eDoc.participantsAttended) eDoc.participantsAttended = [];

        if (eDoc.participantsAttended.indexOf(req.params.userID) === -1) {
          eDoc.participantsAttended.push(req.params.userID);
        } else {
          res.locals.error = {
            status: 400,
            msg: 'That participant has already been marked present'
          };
          return next();
        }
      } else if (uDoc.role === 'Volunteer') {
        if (!eDoc.volunteersAttended) eDoc.volunteersAttended = [];

        if (eDoc.volunteersAttended.indexOf(req.params.userID) === -1) {
          eDoc.volunteersAttended.push(req.params.userID);
        } else {
          res.locals.error = {
            status: 400,
            msg: 'That volunteer has already been marked present'
          };
          return next();
        }
      }

      eDoc.save(function (err) {
        if (err) {
          console.log(err);
          res.locals.error = {
            code: 500,
            msg: err
          };
        }

        res.locals.data = {
          present: true
        };
        return next();
      });
    });
  });
};

module.exports.absent = function (req, res, next) {
  if (!req.params.eventID) {
    res.locals.error = {
      status: 400,
      msg: 'Event ID required'
    };
    return next();
  }

  if (!req.params.userID) {
    res.locals.error = {
      status: 400,
      msg: 'User ID required'
    };
    return next();
  }

  Event.findById(req.params.eventID, function (err, eDoc) {
    if (err || !eDoc) {
      res.locals.error = {
        status: 404,
        msg: 'That event was not found in the database'
      };
      return next();
    }

    User.findById(req.params.userID, function (err, uDoc) {
      if (err || !uDoc) {
        res.locals.error = {
          status: 404,
          msg: 'That user was not found in the database'
        };
        return next();
      }

      if (uDoc.role === 'Participant') {
        if (!eDoc.participantsAttended) eDoc.participantsAttended = [];

        if (eDoc.participantsAttended.indexOf(req.params.userID) !== -1) {
          var temp = eDoc.participantsAttended.map(String);
          temp.splice(temp.indexOf(req.params.userID), 1);
          eDoc.participantsAttended = temp;
        } else {
          res.locals.error = {
            status: 400,
            msg: 'That participant has already been marked absent'
          };
          return next();
        }
      } else if (uDoc.role === 'Volunteer') {
        if (!eDoc.volunteersAttended) eDoc.volunteersAttended = [];

        if (eDoc.volunteersAttended.indexOf(req.params.userID) !== -1) {
          var _temp = eDoc.volunteersAttended.map(String);

          _temp.splice(_temp.indexOf(req.params.userID), 1);

          eDoc.volunteersAttended = _temp;
        } else {
          res.locals.error = {
            status: 400,
            msg: 'That volunteer has already been marked absent'
          };
          return next();
        }
      }

      eDoc.save(function (err) {
        if (err) {
          console.log(err);
          res.locals.error = {
            code: 500,
            msg: err
          };
        }

        res.locals.data = {
          present: true
        };
        return next();
      });
    });
  });
};

module.exports.get = function (req, res, next) {
  if (!req.params.id) {
    res.locals.error = {
      status: 400,
      msg: 'Event ID required'
    };
    return next();
  }

  Event.findById(req.params.id).populate('participants').populate('volunteers').exec(function (err, event) {
    if (event) {
      res.locals.data = {
        event: event
      };
      return next();
    } else {
      console.error(err);
      res.locals.error = {
        status: 404,
        msg: 'That Event was not found in the database'
      };
      return next();
    }
  });
};

module.exports.upload = function (req, res, next) {
  if (!req.params.id) {
    res.locals.error = {
      status: 400,
      msg: 'Event ID required'
    };
    return next();
  }

  var newProps = {};

  if (req.file) {
    newProps.image = req.file.filename;
  }

  Event.findById(req.params.id, function (err, doc) {
    if (err) {
      res.locals.error = {
        status: 404,
        msg: 'Event not found with desired ID'
      };
      return next(new Error(res.locals.error));
    } else {
      doc.set(newProps);
      doc.save(function (err, updated) {
        console.log(err);

        if (err) {
          res.locals.error = {
            status: 500,
            msg: 'Unable to save changes to db'
          };
        }

        res.locals.data = {
          event: updated,
          msg: 'Event picture updated!'
        };
        return next();
      });
    }
  });
};

module.exports.create = function (req, res, next) {
  if (!req.body.name) {
    res.locals.error = {
      status: 400,
      msg: 'Name field is required'
    };
    return next();
  }

  if (!req.body.description) {
    res.locals.error = {
      status: 400,
      msg: 'Description field is required'
    };
    return next();
  }

  if (!req.body.location) {
    res.locals.error = {
      status: 400,
      msg: 'Location field is required'
    };
    return next();
  }

  if (!req.body.startTime) {
    res.locals.error = {
      status: 400,
      msg: 'Start Date & Time field is required'
    };
    return next();
  }

  if (!req.body.endTime) {
    res.locals.error = {
      status: 400,
      msg: 'End Date & Time field is required'
    };
    return next();
  } // uncomment when frontend is done
  // if (!req.body.registrationStart) {
  //   res.locals.error = {
  //     status: 400,
  //     msg: 'Registration Start Date & Time field is required'
  //   }
  //   return next()
  // }
  // if (!req.body.registrationEnd) {
  //   res.locals.error = {
  //     status: 400,
  //     msg: 'Registration End Date & Time field is required'
  //   }
  //   return next()
  // }


  Event.create({
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    // uncomment when frontend is done
    // registrationStart: req.body.registrationStart,
    // registrationEnd: req.body.registrationEnd,
    speakers: req.body.speakers ? req.body.speakers.split(',').map(function (e) {
      return e.trim();
    }) : []
  }, function (err, result) {
    if (err) {
      res.locals.error = {
        status: 500,
        msg: 'An error occurred while saving that event'
      };
      return next();
    } else {
      res.locals.data = {
        event: result,
        msg: 'Event successfully created'
      };
      return next();
    }
  });
};

module.exports.delete = function (req, res, next) {
  if (!req.params.id) {
    res.locals.error = {
      status: 400,
      msg: 'Event id required'
    };
    return next();
  }

  Event.findOne({
    _id: req.params.id
  }).remove(function (err, event) {
    if (event) {
      res.locals.data = {
        msg: 'Event successfully deleted'
      };
      return next();
    } else {
      console.error(err);
      res.locals.error = {
        status: 404,
        msg: 'That Event was not found in the database'
      };
      return next();
    }
  });
};

module.exports.update = function (req, res, next) {
  if (!req.params.id) {
    res.locals.error = {
      status: 404,
      msg: 'That Event was not found in the database'
    };
    return next();
  }

  Event.findById(req.params.id, function (err, event) {
    if (err) {
      console.error(err);
      res.locals.errors = {
        status: 500,
        msg: err
      };
      return next();
    }

    if (!event) {
      res.locals.error = {
        status: 404,
        msg: 'That Event was not found in the database'
      };
      return next();
    }

    var newValues = {};
    if (req.body.name && req.body.name.length > 2) newValues.name = req.body.name;
    if (req.body.description && req.body.description.length > 2) newValues.description = req.body.description;
    if (req.body.location && req.body.location.length > 2) newValues.location = req.body.location;
    if (req.body.startTime && req.body.startTime.length > 2) newValues.startTime = req.body.startTime;
    if (req.body.endTime && req.body.endTime.length > 2) newValues.endTime = req.body.endTime;
    if (req.body.registrationStart && req.body.registrationStart.length > 2) newValues.registrationStart = req.body.registrationStart;
    if (req.body.registrationEnd && req.body.registrationEnd.length > 2) newValues.registrationEnd = req.body.registrationEnd;
    if (req.body.speakers) newValues.speakers = req.body.speakers.split(',').map(function (e) {
      return e.trim();
    });
    event.set(newValues);
    event.save(function (err, updatedEvent) {
      if (err) {
        res.locals.error = {
          code: 500,
          msg: 'Internal Server Error'
        };
        console.log(err);
        return next(new Error(res.locals.error));
      }

      res.locals.data = {
        event: updatedEvent
      };
      return next();
    });
  });
};