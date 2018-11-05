'use strict';

var User = require('mongoose').model('User');

var Event = require('mongoose').model('Event');

var auth = require('../auth');

var isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var isPhone = /^(\+1 )?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}( x\d{1,5})?$/;
var grades = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

var hash = require('../hash');

module.exports.index = function (req, res, next) {
  User.find({}) // don't populate all users, only personal user
  .exec(function (err, users) {
    if (users) {
      res.locals.data = {
        users: users
      };
      return next();
    } else {
      console.error(err);
      res.locals.error = {
        msg: 'There are no users in the database',
        status: 404
      };
      return next();
    }
  });
};

function lacksAny(obj, props) {
  for (var p in props) {
    if (!obj[p]) {
      return p;
    }
  }

  return false;
}

function matchesComplexityRequirements(password) {
  if (password.length < 7) return false;
  var hasAlpha = false;
  var hasNum = false;

  for (var i = 0; i < password.length; i++) {
    var c = password.charCodeAt(i);

    if (c >= 65 && c <= 90 || c >= 97 && c <= 122) {
      hasAlpha = true;
    } else if (c >= 48 && c <= 57) {
      hasNum = true;
    }

    if (hasAlpha && hasNum) return true;
  }

  return false;
}

var validateAdmin = function validateAdmin(data, callback) {
  var tmp = lacksAny(data, ['email', 'password', 'name']);

  if (tmp) {
    return callback({
      reason: 'Data object missing ' + tmp + ' property'
    }, false);
  }

  if (!isEmail.test(data.email)) {
    return callback({
      reason: 'Email invalid'
    }, false);
  }

  if (!matchesComplexityRequirements(data.password)) {
    return callback({
      reason: "Password doesn't match complexity requirements"
    }, false);
  }

  if (data.name.length < 2) {
    return callback({
      reason: 'Name must be at least 3 characters'
    }, false);
  }

  return Object.assign({}, data, {
    'password': hash.genNew(data.password)
  });
};

module.exports.get = function (req, res, next) {
  User.findById(req.params.id).populate('events').populate('pendingEvents').exec(function (err, user) {
    if (user) {
      res.locals.data = {
        user: user
      };
      return next();
    } else {
      console.error(err);
      res.locals.error = {
        status: 404,
        msg: 'That user was not found in the database'
      };
      return next();
    }
  });
};

module.exports.delete = function (req, res, next) {
  User.findById(req.params.id).remove(function (err, user) {
    if (user) {
      res.locals.data = {
        msg: 'User succesfully dleeted'
      };
      return next();
    } else {
      console.error(err);
      res.locals.error = {
        status: 404,
        msg: 'That user was not found in the database'
      };
      return next();
    }
  });
};

module.exports.update = function (req, res, next) {
  if (!req.params.id) {
    res.locals.error = {
      status: 400,
      msg: 'User ID required'
    };
    return next();
  }

  var newProps = {};

  if (req.body.password) {
    // TODO: verify old password
    var token = req.headers.authorization;

    if (!token.startsWith('Bearer ')) {
      res.locals.error = {
        status: 403,
        msg: 'Not authorized (must be admin)'
      };
      return next(new Error(res.locals.error));
    }

    token = token.substring(7);
    auth.currentUser(token, function (_, curr) {
      if (req.params.id !== curr) {
        res.locals.error = {
          status: 403,
          msg: 'Not authorized (must be admin)'
        };
        return next(new Error(res.locals.error));
      }

      if (matchesComplexityRequirements(req.body.data['password'])) {
        newProps['password'] = hash.genNew(req.body.data.password);
      }
    });
  } // ["name", "email", "password", "birthday", "grade", "race", "school", "leader_name", "emergency_contact"]);


  if (req.body.birthday) {
    newProps.birthday = new Date(req.body.birthday);
  }

  if (req.body.grade && grades.indexOf(req.body.grade !== -1)) {
    newProps.grade = req.body.grade;
  }

  if (req.body.age) {
    newProps.age = req.body.age;
  }

  if (req.body.leader) {
    newProps.leader = req.body.leader;
  }

  if (req.body.phone) {
    newProps.phone = req.body.phone;
  }

  if (req.body.race && req.body.race.length > 2) {
    newProps.race = req.body.race;
  }

  if (req.body.school && req.body.school.length > 2) {
    newProps.school = req.body.school;
  }

  if (req.body.emergencyContactName && req.body.emergencyContactName.length > 2) {
    newProps.emergencyContactName = req.body.emergencyContactName;
  }

  if (req.body.emergencyContactPhone && req.body.emergencyContactPhone.length > 2) {
    newProps.emergencyContactPhone = req.body.emergencyContactPhone;
  }

  if (req.body.emergencyContactRelation && req.body.emergencyContactRelation.length > 2) {
    newProps.emergencyContactRelation = req.body.emergencyContactRelation;
  } // TODO: Sam update error object or at least addd message if any of these fail


  User.findById(req.params.id, function (err, doc) {
    if (err) {
      res.locals.error = {
        status: 404,
        msg: 'User not found with desired ID'
      };
      return next(new Error(res.locals.error));
    } else {
      doc.set(newProps);
      doc.save(function (err, updated) {
        if (err) {
          res.locals.error = {
            status: 500,
            msg: 'Unable to save user changes to db'
          };
        } else {
          res.locals.data = {
            user: updated
          };
        }

        return next();
      });
    }
  });
};

module.exports.upload = function (req, res, next) {
  if (!req.params.id) {
    res.locals.error = {
      status: 400,
      msg: 'User ID required'
    };
    return next();
  }

  var newProps = {};

  if (req.file) {
    newProps.image = req.file.filename;
  }

  User.findById(req.params.id, function (err, doc) {
    if (err) {
      res.locals.error = {
        status: 404,
        msg: 'User not found with desired ID'
      };
      return next(new Error(res.locals.error));
    } else {
      doc.set(newProps);
      doc.save(function (err, updated) {
        if (err) {
          res.locals.error = {
            status: 500,
            msg: 'Unable to save changes to db'
          };
        }

        res.locals.data = {
          user: updated,
          msg: 'Profile picture updated!'
        };
        return next();
      });
    }
  });
};

module.exports.create = function (req, res, next) {
  var newProps = {};

  if (matchesComplexityRequirements(req.body.password)) {
    newProps.password = hash.genNew(req.body.password);
  } else {
    res.locals.error = {
      status: 400,
      msg: 'Invalid password'
    };
    return next(new Error(res.locals.error));
  }

  if (req.body.name && req.body.name.length >= 2) {
    newProps.name = req.body.name;
  }

  if (req.body.email && isEmail.test(req.body.email)) {
    newProps.email = req.body.email;
  } else {
    res.locals.error = {
      status: 400,
      msg: 'Invalid email'
    };
    return next(new Error(res.locals.error));
  }

  if (req.body.grade && grades.indexOf(req.body.grade !== -1)) {
    newProps.grade = req.body.grade;
  }

  if (req.body.age) {
    newProps.age = req.body.age;
  }

  if (req.body.leader) {
    newProps.leader = req.body.leader;
  }

  if (req.body.phone) {
    newProps.phone = req.body.phone;
  }

  if (req.body.race && req.body.race.length > 2) {
    newProps.race = req.body.race;
  }

  if (req.body.school && req.body.school.length > 2) {
    newProps.school = req.body.school;
  }

  if (req.body.emergencyContactName && req.body.emergencyContactName.length > 2) {
    newProps.emergencyContactName = req.body.emergencyContactName;
  }

  if (req.body.emergencyContactPhone && req.body.emergencyContactPhone.length > 2) {
    newProps.emergencyContactPhone = req.body.emergencyContactPhone;
  }

  if (req.body.emergencyContactRelation && req.body.emergencyContactRelation.length > 2) {
    newProps.emergencyContactRelation = req.body.emergencyContactRelation;
  }

  User.create(newProps, function (err, user) {
    if (err) {
      res.locals.error = {
        status: 400,
        msg: 'User unable to be created'
      };
      return next(new Error(res.locals.error));
    } else {
      res.locals.data = {
        user: user
      };
      return next();
    }
  });
};

module.exports.registerevent = function (req, res, next) {
  if (!req.params.eventID) {
    res.locals.error = {
      status: 400,
      msg: 'Event ID required'
    };
    return next(new Error(res.locals.error));
  }

  if (!req.params.userID) {
    res.locals.error = {
      status: 400,
      msg: 'User ID required'
    };
    return next(new Error(res.locals.error));
  }

  var userID = req.params.userID;
  var eventID = req.params.eventID;
  Event.findById(eventID, function (err, eDoc) {
    if (err || !eDoc) {
      res.locals.error = {
        status: 404,
        msg: 'That event was not found in the database'
      };
      return next(new Error(res.locals.error));
    }

    User.findById(userID, function (err, uDoc) {
      if (err || !uDoc) {
        res.locals.error = {
          status: 404,
          msg: 'That user was not found in the database'
        };
        return next(new Error(res.locals.error));
      } // update event.users


      if (!eDoc.participants) eDoc.participants = [];
      if (!eDoc.pendingVolunteers) eDoc.pendingVolunteers = [];

      if (uDoc.role === 'Participant') {
        if (!eDoc.participants.map(String).includes(userID)) {
          eDoc.participants.push(userID);
        } else {
          res.locals.error = {
            status: 400,
            msg: 'This participant has already registered for this event'
          };
          return next(new Error(res.locals.error));
        }
      } else if (uDoc.role === 'Volunteer' || uDoc.role === 'Admin') {
        if (uDoc.deniedEvents != null && !uDoc.deniedEvents.map(String).includes(eventID)) {
          if (!eDoc.pendingVolunteers.map(String).includes(userID)) {
            eDoc.pendingVolunteers.push(userID);
          } else {
            res.locals.error = {
              status: 400,
              msg: 'This volunteer has already registered for this event'
            };
            return next(new Error(res.locals.error));
          }
        } else {
          res.locals.error = {
            status: 400,
            msg: 'Your registration was denied'
          };
          return next(new Error(res.locals.error));
        }
      } // update users.events


      if (!uDoc.events) uDoc.events = [];

      if (uDoc.role === 'Volunteer') {
        if (!uDoc.pendingEvents) uDoc.pendingEvents = [];

        if (uDoc.pendingEvents.map(String).includes(eventID) || uDoc.events.map(String).includes(eventID)) {
          res.locals.error = {
            status: 400,
            msg: 'This volunteer already has this event register data.'
          };
          return next(new Error(res.locals.error));
        } else {
          uDoc.pendingEvents.push(eventID);
        }
      } else {
        if (uDoc.events.map(String).includes(eventID)) {
          res.locals.error = {
            status: 400,
            msg: 'This volunteer already has this event register data.'
          };
          return next(new Error(res.locals.error));
        } else {
          uDoc.events.push(eventID);
        }
      }

      uDoc.save(function (err) {
        if (err) {
          console.error(err);
          res.locals.error = {
            code: 500,
            msg: err
          };
          return next();
        }

        eDoc.save(function (err) {
          if (err) {
            console.error(err);
            res.locals.error = {
              code: 500,
              msg: err
            };
          }

          res.locals.data = {
            userId: userID,
            eventId: eventID,
            newEvents: uDoc.events,
            newPending: uDoc.pendingEvents,
            newParticipants: eDoc.participants,
            newVolunteers: eDoc.volunteers
          };
          return next();
        });
      });
    });
  });
};

module.exports.denyRegistration = function (req, res, next) {
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

  var userID = req.params.userID;
  var eventID = req.params.eventID;
  Event.findById(eventID, function (err, eDoc) {
    if (err || !eDoc) {
      res.locals.error = {
        status: 404,
        msg: 'That event was not found in the database'
      };
      return next();
    }

    User.findById(userID, function (err, uDoc) {
      if (err || !uDoc) {
        res.locals.error = {
          status: 404,
          msg: 'That user was not found in the database'
        };
        return next();
      }

      if (!eDoc.participants) eDoc.participants = [];
      if (!eDoc.volunteers) eDoc.volunteers = [];

      if (!eDoc.pendingVolunteers.map(String).includes(userID)) {
        res.locals.error = {
          status: 400,
          msg: 'That user has not registered for that event.'
        };
        return next();
      }

      if (!uDoc.events) uDoc.events = [];
      if (!uDoc.pendingEvents) uDoc.pendingEvents = [];
      if (!uDoc.deniedEvents) uDoc.deniedEvents = [];
      if (!eDoc.deniedVolunteers) eDoc.deniedVolunteers = [];

      if (uDoc.deniedEvents.map(String).includes(eventID)) {
        res.locals.error = {
          status: 400,
          msg: 'That user has already been denied.'
        };
        return next();
      }

      if (uDoc.pendingEvents.map(String).includes(eventID)) {
        var temp = uDoc.pendingEvents.map(String);
        temp.splice(temp.indexOf(eventID), 1);
        uDoc.pendingEvents = temp;
        uDoc.deniedEvents.push(eventID);
        var tempE = eDoc.pendingVolunteers.map(String);
        tempE.splice(tempE.indexOf(userID), 1);
        eDoc.pendingVolunteers = tempE;
        eDoc.deniedVolunteers.push(userID);
      } else {
        res.locals.error = {
          status: 400,
          msg: 'That user has not registered for that event.'
        };
        return next();
      }

      uDoc.save(function (err) {
        if (err) {
          console.error(err);
          res.locals.error = {
            code: 500,
            msg: err
          };
          return next();
        }

        eDoc.save(function (err) {
          if (err) {
            console.error(err);
            res.locals.error = {
              code: 500,
              msg: err
            };
          }

          res.locals.data = {
            userId: userID,
            eventId: eventID,
            newEvents: uDoc.events,
            newPending: uDoc.pendingEvents,
            newParticipants: eDoc.participants,
            newDeniedVolunteers: eDoc.deniedVolunteers,
            newVolunteers: eDoc.volunteers
          };
          return next();
        });
      });
    });
  });
};

module.exports.confirmRegistration = function (req, res, next) {
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

  var userID = req.params.userID;
  var eventID = req.params.eventID;
  Event.findById(eventID, function (err, eDoc) {
    if (err || !eDoc) {
      res.locals.error = {
        status: 404,
        msg: 'That event was not found in the database'
      };
      return next();
    }

    User.findById(userID, function (err, uDoc) {
      if (err || !uDoc) {
        res.locals.error = {
          status: 404,
          msg: 'That user was not found in the database'
        };
        return next();
      }

      if (!eDoc.participants) eDoc.participants = [];
      if (!eDoc.volunteers) eDoc.volunteers = [];

      if (!eDoc.pendingVolunteers.map(String).includes(userID)) {
        res.locals.error = {
          status: 400,
          msg: 'That user is not pending registration for that event.'
        };
        return next();
      }

      if (!uDoc.events) uDoc.events = [];
      if (!uDoc.pendingEvents) uDoc.pendingEvents = [];
      if (!eDoc.pendingVolunteers) eDoc.pendingVolunteers = [];

      if (uDoc.pendingEvents.map(String).includes(eventID)) {
        var temp = uDoc.pendingEvents.map(String);
        temp.splice(temp.indexOf(eventID), 1);
        uDoc.pendingEvents = temp;
        uDoc.events.push(eventID);
        var tempE = eDoc.pendingVolunteers.map(String);
        tempE.splice(tempE.indexOf(userID), 1);
        eDoc.pendingVolunteers = tempE;
        eDoc.volunteers.push(userID);
      } else {
        res.locals.error = {
          status: 400,
          msg: 'That user has not registered for that event.'
        };
        return next();
      }

      uDoc.save(function (err) {
        if (err) {
          console.error(err);
          res.locals.error = {
            code: 500,
            msg: err
          };
          return next();
        }

        eDoc.save(function (err) {
          if (err) {
            console.error(err);
            res.locals.error = {
              code: 500,
              msg: err
            };
          }

          res.locals.data = {
            userId: userID,
            eventId: eventID,
            newEvents: uDoc.events,
            newPending: uDoc.pendingEvents,
            newParticipants: eDoc.participants,
            newPendingVolunteers: eDoc.pendingVolunteers,
            newVolunteers: eDoc.volunteers
          };
          return next();
        });
      });
    });
  });
};

module.exports.cancelevent = function (req, res, next) {
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

  var userID = req.params.userID;
  var eventID = req.params.eventID;
  Event.findById(eventID, function (err, eDoc) {
    if (err || !eDoc) {
      res.locals.error = {
        status: 404,
        msg: 'That event was not found in the database'
      };
      return next();
    }

    User.findById(userID, function (err, uDoc) {
      if (err || !uDoc) {
        res.locals.error = {
          status: 404,
          msg: 'That user was not found in the database'
        };
        return next();
      }

      if (!eDoc.participants) eDoc.participants = [];
      if (!eDoc.volunteers) eDoc.volunteers = [];

      if (eDoc.participants.map(String).includes(userID)) {
        // TODO: Add in role checks (this works for now though)
        var temp = eDoc.participants.map(String);
        temp.splice(temp.indexOf(userID), 1);
        eDoc.participants = temp;
      } else if (eDoc.volunteers.map(String).includes(userID)) {
        var _temp = eDoc.volunteers.map(String);

        _temp.splice(_temp.indexOf(userID), 1);

        eDoc.volunteers = _temp;
      } else if (eDoc.pendingVolunteers.map(String).includes(userID)) {
        var _temp2 = eDoc.pendingVolunteers.map(String);

        _temp2.splice(_temp2.indexOf(userID), 1);

        eDoc.pendingVolunteers = _temp2;
      } else {
        res.locals.error = {
          status: 400,
          msg: 'That user has not registered for that event.'
        };
        return next();
      } // TODO: Some kind of warning if things don't add up


      if (!uDoc.events) uDoc.events = [];

      if (uDoc.role === 'Volunteer' && uDoc.pendingEvents.map(String).includes(eventID)) {
        // TODO: Some way for admins to remove volunteers from confirmed events
        if (!uDoc.pendingEvents) uDoc.events = [];

        var _temp3 = uDoc.pendingEvents.map(String);

        _temp3.splice(_temp3.indexOf(eventID), 1);

        uDoc.pendingEvents = _temp3;
      } else if (uDoc.events.map(String).includes(eventID)) {
        var _temp4 = uDoc.events.map(String);

        _temp4.splice(_temp4.indexOf(eventID), 1);

        uDoc.events = _temp4;
      } else {
        res.locals.error = {
          status: 400,
          msg: 'This event cannot be found in user data.'
        };
        return next();
      }

      uDoc.save(function (err) {
        if (err) {
          console.error(err);
          res.locals.error = {
            code: 500,
            msg: err
          };
          return next();
        }

        eDoc.save(function (err) {
          if (err) {
            console.error(err);
            res.locals.error = {
              code: 500,
              msg: err
            };
          }

          res.locals.data = {
            userId: userID,
            eventId: eventID,
            newEvents: uDoc.events,
            newPending: uDoc.pendingEvents,
            newParticipants: eDoc.participants,
            newVolunteers: eDoc.volunteers
          };
          return next();
        });
      });
    });
  });
};