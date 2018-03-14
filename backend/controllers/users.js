"use strict";
const User = require('mongoose').model('User');
const Event = require('mongoose').model('Event');
const auth = require('../auth');
let isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
let isPhone = /^(\+1 )?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}( x\d{1,5})?$/
let grades = ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const hash = require("../hash");

module.exports.index = (req, res, next) => {
  User
    .find({})
    .populate('events')
    .exec((err, users) => {
      if (users) {
        res.locals.data = {
          users: users
        };
        return next();
      } else {
        res.locals.error = {
          msg: 'There are no users in the database',
          status: 404
        };
        return next();
      }
    });
}

function lacksAny(obj, props) {
  for (p in props) {
    if (!(obj[p])) {
      return p;
    }
  }
  return false;
}

function matchesComplexityRequirements(password) {
  if (password.length < 7) return false;
  let hasAlpha = false;
  let hasNum = false;
  for (let i = 0; i < password.length; i++) {
    let c = password.charCodeAt(i);
    if ((c >= 65 && c <= 90) || (c >= 97 && c <= 122)) {
      hasAlpha = true;
    } else if (c >= 48 && c <= 57) {
      hasNum = true;
    }
    if (hasAlpha && hasNum) return true;
  }
  return false;
}

let validateAdmin = (data, callback) => {
  let tmp = lacksAny(data, ["email", "password", "name"]);
  if (tmp) {
    return callback({reason: "Data object missing " + tmp + " property"}, false);
  }
  if (!isEmail.test(data.email)) {
    return callback({reason: "Email invalid"}, false);
  }
  if (!matchesComplexityRequirements(data.password)) {
    return callback({reason: "Password doesn't match complexity requirements"}, false);
  }
  if (data.name.length < 2) {
    return callback({reason: "Name must be at least 3 characters"}, false);
  }
  return Object.assign({}, data, {"password": hash.genNew(data.password)});
}

module.exports.get = (req, res, next) => {
  User
    .findById(req.params.id)
    .populate('events')
    .populate('pendingEvents')
    .exec((err, user) => {
      if (user) {
        res.locals.data = {
          user: user
        };
        return next();
      } else {
        res.locals.error = {
          status: 404,
          msg: 'That user was not found in the database'
        };
        return next();
      }
    });
}

module.exports.delete = (req, res, next) => {
  User.findById(req.params.id).remove((err, user) => {
    if (user) {
      res.locals.data = {}
      return next();
    } else {
      res.locals.error = {
        status: 404,
        msg: 'That user was not found in the database'
      };
      return next();
    }
  });
}

module.exports.update = (req, res, next) => {
  if (!req.params.id) {
    res.locals.error = {
      status: 400,
      msg: 'User ID required'
    };
    return next();
  }
  let newProps = {};

  if (req.body.password) {
    //TODO: verify old password
    let token = req.headers.authorization;
    if (!token.startsWith("Bearer ")) {
      res.locals.error = {
        status: 403,
        msg: 'Not authorized (must be admin)'
      };
      return next(new Error(res.locals.error));
    }
    token = token.substring(7);
    auth.currentUser(token, (_, curr) => {
      if (req.params.id != curr) {
        res.locals.error = {
          status: 403,
          msg: 'Not authorized (must be admin)'
        };
        return next(new Error(res.locals.error));
      }
      if (matchesComplexityRequirements(req.body.data[password])) {
        newProps["password"] = hash.genNew(req.body.data.password);
      }
    });
  }
  if (req.body.name && req.body.name.length >= 2) {
    newProps.name = req.body.name;
  }
  //["name", "email", "password", "birthday", "grade", "race", "school", "leader_name", "emergency_contact"]);
  if (req.body.email && isEmail.test(req.body.email)) {
    newProps.email = req.body.email;
  }
  if (req.body.grade && grades.indexOf(req.body.grade != -1)) {
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

  User.findById(req.params.id, (err, doc) => {
    if (err) {
      res.locals.error = {
        status: 404,
        msg: "User not found with desired ID"
      }
      return next(new Error(res.locals.error));
    } else {
      doc.set(newProps);
      doc.save((err, updated) => {
        console.log(err)
        if (err) {
          res.locals.error = {
            status: 500,
            msg: "Unable to save changes to db"
          }
        }
        res.locals.data = {
          user: updated
        };
        return next();
      });
    }
  });
}

module.exports.upload = (req, res, next) => {
  console.log(req);
  if (!req.params.id) {
    res.locals.error = {
      status: 400,
      msg: 'User ID required'
    };
    return next();
  }
  let newProps = {};
  if (req.file) {
      newProps.image = req.file.path;
  }

  User.findById(req.params.id, (err, doc) => {
    if (err) {
      res.locals.error = {
        status: 404,
        msg: "User not found with desired ID"
      }
      return next(new Error(res.locals.error));
    } else {
      doc.set(newProps);
      doc.save((err, updated) => {
        console.log(err)
        if (err) {
          res.locals.error = {
            status: 500,
            msg: "Unable to save changes to db"
          }
        }
        res.locals.data = {
          user: updated
        };
        return next();
      });
    }
  });
}

module.exports.create = (req, res, next) => {
  let newProps = {};
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
  if (req.body.grade && grades.indexOf(req.body.grade != -1)) {
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

  console.log(newProps);

  User.create(newProps, (err, user) => {
    if (err) {
      console.log(err);
      res.locals.error = {
        status: 400,
        msg: "User unable to be created"
      }
      return next(new Error(res.locals.error));
    } else {
      res.locals.data = {
        user: user
      };
      return next();
    }
  });
}

module.exports.registerevent = (req, res, next) => {
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
  const userID = req.params.userID;
  const eventID = req.params.eventID;

  Event.findById(eventID, function(err, eDoc){
    if (err || !eDoc) {
      res.locals.error = {
        status: 404,
        msg: 'That event was not found in the database'
      };
      return next();
    }
    User.findById(userID, function(err, uDoc){
      if (err || !uDoc) {
        res.locals.error = {
          status: 404,
          msg: 'That user was not found in the database'
        };
        return next();
      }
      // update event.users
      if (!eDoc.participants) eDoc.participants = [];
      if (!eDoc.volunteers) eDoc.volunteers = [];
      if (uDoc.role == "Participant") {
          if (!eDoc.participants.map(String).includes(userID)) {
              eDoc.participants.push(userID);
          } else {
              res.locals.error = {
                status: 400,
                msg: 'This participant has already registered for this event'
              };
              return next();
          }
      } else if (uDoc.role == "Volunteer" || uDoc.role == "Admin") {
          if (!eDoc.volunteers.map(String).includes(userID)) {
              eDoc.volunteers.push(userID);
          } else {
            res.locals.error = {
              status: 400,
              msg: 'This volunteer has already registered for this event'
            };
            return next();
          }
      }
      // update users.events
      if (!uDoc.events) uDoc.events = [];
      if (uDoc.role == "Volunteer") {
        if (!uDoc.pendingEvents) uDoc.pendingEvents = [];
	if (uDoc.pendingEvents.map(String).includes(eventID) || uDoc.events.map(String).includes(eventID)) {
	  res.locals.error = {
	    status: 400,
	    msg: "This volunteer already has this event register data."
	  }
	  return next();
	} else {
          uDoc.pendingEvents.push(eventID);
	}
      } else {
	if (uDoc.events.map(String).includes(eventID)) {
	  res.locals.error = {
	    status: 400,
	    msg: "This volunteer already has this event register data."
	  }
	  return next();
	} else {
          uDoc.events.push(eventID);
	}
      }

      uDoc.save(err => {
        if (err) {
          console.log(err);
          res.locals.error = {
            code: 500,
            msg: err
          };
          return next();
        }
        eDoc.save(err => {
          if (err) {
            console.log(err);
            res.locals.error = {
              code: 500,
              msg: err
            };
          }

          res.locals.data = {
	    eventID,
            newEvents: uDoc.events,
	    newPending: uDoc.pendingEvents,
	    newParticipants: eDoc.participants,
            newVolunteers: eDoc.volunteers
          }
          return next();
        });
      });
    });
  });
}

module.exports.confirmRegistration = (req, res, next) => {
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
  const userID = req.params.userID;
  const eventID = req.params.eventID;

  Event.findById(eventID, function(err, eDoc){
    if (err || !eDoc) {
      res.locals.error = {
        status: 404,
        msg: 'That event was not found in the database'
      };
      return next();
    }
    User.findById(userID, function(err, uDoc){
      if (err || !uDoc) {
        res.locals.error = {
          status: 404,
          msg: 'That user was not found in the database'
        };
        return next();
      }

      if (!eDoc.participants) eDoc.participants = [];
      if (!eDoc.volunteers) eDoc.volunteers = [];
      if (!eDoc.volunteers.map(String).includes(userID)) {
        res.locals.error = {
          status: 400,
          msg: 'That user has not registered for that event.'
        };
        return next();
      }

      if (!uDoc.events) uDoc.events = [];
      if (!uDoc.pendingEvents) uDoc.pendingEvents = [];
      if (uDoc.pendingEvents.map(String).includes(eventID)) {
        var temp = uDoc.pendingEvents.map(String);
        temp.splice(temp.indexOf(eventID), 1);
        uDoc.pendingEvents = temp;
        uDoc.events.push(eventID);
      } else {
        res.locals.error = {
          status: 400,
          msg: 'That user has not registered for that event.'
        };
        return next();
      }

      uDoc.save((err) => {
        if (err) {
          console.log(err);
          res.locals.error = {
            code: 500,
            msg: err
          };
          return next();
        }
        eDoc.save(err => {
          if (err) {
            console.log(err);
            res.locals.error = {
              code: 500,
              msg: err
            };
          }

	  res.locals.data = {
	    eventID,
            newEvents: uDoc.events,
	    newPending: uDoc.pendingEvents,
	    newParticipants: eDoc.participants,
            newVolunteers: eDoc.volunteers
          }
          return next();
        });
      });
    });
  });
}

module.exports.cancelevent = (req, res, next) => {
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
  const userID = req.params.userID;
  const eventID = req.params.eventID;
  Event.findById(eventID, function(err, eDoc){
    if (err || !eDoc) {
      res.locals.error = {
        status: 404,
        msg: 'That event was not found in the database'
      };
      return next();
    }
    User.findById(userID, function(err, uDoc){
      if (err || !uDoc) {
        res.locals.error = {
          status: 404,
          msg: 'That user was not found in the database'
        };
        return next();
      }

      if (!eDoc.participants) eDoc.participants = [];
      if (!eDoc.volunteers) eDoc.volunteers = [];
      if (eDoc.participants.map(String).includes(userID)) { // TODO: Add in role checks (this works for now though)
        var temp = eDoc.participants.map(String);
        temp.splice(temp.indexOf(userID), 1);
        eDoc.participants = temp;
      } else if (eDoc.volunteers.map(String).includes(userID)) {
        var temp = eDoc.volunteers.map(String);
        temp.splice(temp.indexOf(userID), 1);
        eDoc.volunteers = temp;
      } else {
        res.locals.error = {
          status: 400,
          msg: 'That user has not registered for that event.'
        };
        return next();
      }
      // TODO: Some kind of warning if things don't add up
      if (!uDoc.events) uDoc.events = [];
      if (uDoc.role == "Volunteer" && uDoc.pendingEvents.map(String).includes(eventID)) { // TODO: Some way for admins to remove volunteers from confirmed events
        if (!uDoc.pendingEvents) uDoc.events = [];
        var temp = uDoc.pendingEvents.map(String);
        temp.splice(temp.indexOf(eventID), 1);
        uDoc.pendingEvents = temp;
      } else if (uDoc.events.map(String).includes(eventID)) {
        var temp = uDoc.events.map(String);
        temp.splice(temp.indexOf(eventID), 1);
        uDoc.events = temp;
      } else {
        res.locals.error = {
          status: 400,
          msg: 'This event cannot be found in user data.'
        };
        return next();
      }

      uDoc.save((err) => {
        if (err) {
          console.log(err);
          res.locals.error = {
            code: 500,
            msg: err
          };
          return next();
        }
        eDoc.save(err => {
          if (err) {
            console.log(err);
            res.locals.error = {
              code: 500,
              msg: err
            };
          }

	  res.locals.data = {
	    eventID,
            newEvents: uDoc.events,
	    newPending: uDoc.pendingEvents,
	    newParticipants: eDoc.participants,
            newVolunteers: eDoc.volunteers
          }
          return next();
        });
      });
    });
  });
}
