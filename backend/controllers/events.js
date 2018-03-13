const Event = require('mongoose').model('Event');
const User = require('mongoose').model('User');
const async = require('async');

var currDate = new Date();

module.exports.index = (req, res, next) => {
  Event
    .find({})
    .populate('participants')
    .exec((err, events) => {
      if (events) {
        res.locals.data = {
          events: events
        };
        return next();
      } else {
        res.locals.error = {
          msg: 'There are no events in the database',
          status: 404
        };
        return next();
      }
    });
}

module.exports.fetchFutureEvents = (req, res, next) => {
  Event
    .find({"datetime":{$gt: currDate}})
    .populate('participants')
    .exec((err, events) => {
      if (events) {
        res.locals.data = {
          events
        };
        return next();
      } else {
        res.locals.error = {
          msg: 'There are no events in the database',
          status: 404
        };
        return next();
      }
    });
}

module.exports.fetchPastEvents = (req, res, next) => {
  Event
    .find({datetime: {$lte: currDate}})
    .populate('participants')
    .exec((err, events) => {
      if (events) {
        res.locals.data = {
          events
        };
        return next();
      } else {
        res.locals.error = {
          msg: 'There are no events in the database',
          status: 404
        };
        return next();
      }
    });
}

module.exports.present = (req, res, next) => {
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
  Event.findById(req.params.eventID, function(err, eDoc){
    if (err || !eDoc) {
      res.locals.error = {
        status: 404,
        msg: 'That event was not found in the database'
      };
      return next();
    }
    User.findById(req.params.userID, function(err, uDoc){
      if (err || !uDoc) {
        res.locals.error = {
          status: 404,
          msg: 'That user was not found in the database'
        };
        return next();
      }

      if (!eDoc.participants) eDoc.participants = [];
      if (eDoc.participants.indexOf(req.params.userID) === -1) {
        eDoc.participants.push(req.params.userID);
      } else {
        res.locals.error = {
          status: 400,
          msg: 'That user has already been marked present'
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
          present: true
        }
        return next();
      });
      /* Attendance doesn't affect users
      If (!uDoc.events) uDoc.events = [];
      uDoc.events.push(req.params.eventID);

      uDoc.save((err) => {
        if (err) {
          console.log(err);
          res.locals.error = {
            code: 500,
            msg: err
          };
          return next();
        }
      });
      */
    });
  });
}

module.exports.absent = (req, res, next) => {
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

  Event.findById(req.params.eventID, function(err, eDoc){
    if (err || !eDoc) {
      res.locals.error = {
        status: 404,
        msg: 'That event was not found in the database'
      };
      return next();
    }

    User.findById(req.params.userID, function(err, uDoc){
      if (err || !uDoc) {
        res.locals.error = {
          status: 404,
          msg: 'That user was not found in the database'
        };
        return next();
      }

      if (eDoc.participants) {
        let ind = eDoc.participants.indexOf(req.params.userID);
        if (ind != -1) {
          eDoc.participants.splice(ind, 1);
        }
      }

      /* Same as above, though this would be odd...
      if (uDoc.events) {
        let ind = uDoc.events.indexOf(req.params.eventID);
        if (ind != -1) {
          uDoc.events.splice(ind, 1);

        }
      }
      */
      eDoc.save(err => {
        if (err) {
          console.log(err);
          res.locals.error = {
            code: 500,
            msg: err
          };
        }
	return next();
	/*
        uDoc.save(err => {
          if (err) {
            console.log(err);
            res.locals.error = {
              code: 500,
              msg: err
            };
          }

          res.locals.data = {
            absent: true
          }
          return next();
        });
	*/
      });
    });
  });
};

module.exports.get = (req, res, next) => {
  if (!req.params.id) {
    res.locals.error = {
      status: 400,
      msg: 'Event ID required'
    };
    return next();
  }

  Event
    .findById(req.params.id)
    .populate('participants')
    .exec((err, event) => {
      if (event) {
        res.locals.data = {
          event: event
        };
        return next();
      } else {
        res.locals.error = {
          status: 404,
          msg: 'That Event was not found in the database'
        };
        return next();
      }
    });
}

module.exports.upload = (req, res, next) => {
    if (!req.params.id) {
      res.locals.error = {
        status: 404,
        msg: 'That Event was not found in the database'
      };
      return next();
    }

    Event.findById(req.params.id, (err, event) => {
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

      let newValues = {};
      console.log(req.file);
      if (req.file) {
          newValues.image = req.file.path;
      }

      event.set(newValues);
      event.save((err, updatedEvent) => {
        if (err) {
          res.locals.error = {
            code: 500,
            msg: 'Internal Server Error'
          }
          console.log(err);
          return next(new Error(res.locals.error));
        }
        res.locals.data = {
          event: updatedEvent
        };
        return next();
      });
    });
}

module.exports.create = (req, res, next) => {
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

  if (!req.body.datetime) {
    res.locals.error = {
      status: 400,
      msg: 'Date & Time field is required'
    };
    return next();
  }

  Event.create({
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
    datetime: req.body.datetime
  }, (err, result) => {
    if (err) {
      res.locals.error = {
        status: 500,
        msg: 'An error occurred while saving that event'
      };
      return next();
    } else {
      res.locals.data = {
        event: result
      }
      return next();
    }
  });
}

module.exports.delete = (req, res, next) => {
  if (!req.params.id) {
    res.locals.error = {
      status: 400,
      msg: 'Event id required'
    };
    return next();
  }

  Event.findOne({
    _id: req.params.id
  }).remove((err, event) => {
    if (event) {
      res.locals.data = {}
      return next();
    } else {
      res.locals.error = {
        status: 404,
        msg: 'That Event was not found in the database'
      };
      return next();
    }
  });
}

module.exports.update = (req, res, next) => {
  if (!req.params.id) {
    res.locals.error = {
      status: 404,
      msg: 'That Event was not found in the database'
    };
    return next();
  }

  Event.findById(req.params.id, (err, event) => {
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

    let newValues = {};
    if (req.body.name && req.body.name.length > 2) newValues.name = req.body.name;
    if (req.body.description && req.body.description.length > 2) newValues.description = req.body.description;
    if (req.body.location && req.body.location.length > 2) newValues.location = req.body.location;
    if (req.body.datetime && req.body.datetime.length > 2) newValues.datetime = req.body.datetime;
    if (req.body.speakers) newValues.speakers = req.body.speakers.split(',').map(e => e.trim());

    event.set(newValues);
    event.save((err, updatedEvent) => {
      if (err) {
        res.locals.error = {
          code: 500,
          msg: 'Internal Server Error'
        }
        console.log(err);
        return next(new Error(res.locals.error));
      }
      res.locals.data = {
        event: updatedEvent
      };
      return next();
    });
  });
}
