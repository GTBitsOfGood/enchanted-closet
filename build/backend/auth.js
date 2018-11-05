"use strict";

var hash = require('./hash');

var mongoose = require('mongoose');

var User = mongoose.model('User');

var randomBytes = require('crypto').randomBytes;

var redisClient = require('redis').createClient();

var mail = require('./gmailAuth');

var isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // const isPhone = /^(\+1 )?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}( x\d{1,5})?$/

var grades = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
var authHeader = 'authorization';
var authError = {
  code: 403,
  msg: 'Invalid authorization credentials'
};
redisClient.on('error', function (err) {
  console.error('Error ' + err);
});

var isAdmin = function isAdmin(id, callback) {
  if (!id) {
    // catch falsy values like null or empty string
    return callback(null, false);
  }

  User.findById(id, function (err, result) {
    if (!err && result.role === 'Admin') {
      return callback(err, true);
    }

    callback(null, false);
  });
};

function lacksAny(obj, props) {
  for (var p in props) {
    var k = props[p];

    if (!obj[k]) {
      return k;
    }
  }

  return null;
}

var matchesComplexityRequirements = function matchesComplexityRequirements(password) {
  // TODO: put these requirements on frontend
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
};

var validateUser = function validateUser(data, callback) {
  // TODO: Reinstate backend validation (Low business value)

  /*
     let tmp = lacksAny(data, ["name", "email", "password", "birthday", "grade", "race", "school", "leader", "emergencycontactname", "emergencycontactphone", "emergencycontactrelation"]);
     if (tmp !== null) return callback({reason: `Data object missing ${tmp} property`}, null);
      if (data.name.length < 2) return callback({reason: "Name must be at least 3 characters"}, null);
      if (!isEmail.test(data.email)) return callback({reason: "Email invalid"}, null);
      if (!matchesComplexityRequirements(data.password)) return callback({reason: "Password doesn't match complexity requirements"}, null);
      if (grades.indexOf(data.grade) === -1) return callback({reason: "Grade is not valid"}, null);
      data.emergencyContactName = data.emergencycontactname;
     delete data.emergencycontactname;
     data.emergencyContactPhone = data.emergencycontactphone;
     delete data.emergencycontactphone;
     data.emergencyContactRelation = data.emergencycontactrelation;
     delete data.emergencycontactrelation;
   */
  var capitalized = data.role.charAt(0).toUpperCase() + data.role.slice(1);
  return callback(null, Object.assign({}, data, {
    'password': hash.genNew(data.password)
  }, {
    'role': capitalized
  }));
};

var currentUser = function currentUser(tok, callback) {
  if (!tok) {
    // catch falsy values like null, empty string
    return callback(null, null);
  }

  redisClient.get(tok, function (err, reply) {
    callback(err, reply);
  });
};

module.exports.idMatchesOrAdmin = function (req, res, next) {
  var token = req.header('Authorization');

  if (!token || !token.startsWith('Bearer ')) {
    res.locals.error = {
      status: 403,
      msg: 'Not authorized (must be admin)'
    };
    return next(new Error(res.locals.error));
  }

  token = token.substring(7);
  currentUser(token, function (err, curr) {
    // TODO put back in module.exports if broken
    if (err) {
      res.locals.error = {
        status: 403,
        msg: 'Not authorized or redis error'
      };
      return next(new Error(res.locals.error));
    }

    isAdmin(curr, function (err, state) {
      // TODO see above
      if (err) {
        res.locals.error = {
          status: 403,
          msg: 'Not authorized or redis error'
        };
        return next(new Error(res.locals.error));
      }

      if (curr == null || curr !== req.params.id && !state) {
        res.locals.error = {
          status: 403,
          msg: 'Not authorized'
        };
        return next(new Error(res.locals.error));
      }

      return next();
    });
  });
};

module.exports.checkAdmin = function (req, res, next) {
  var token = req.header('Authorization');

  if (!token.startsWith('Bearer ')) {
    res.locals.error = {
      status: 403,
      msg: 'Not authorized (must be admin)'
    };
    return next(new Error(res.locals.error));
  }

  token = token.substring(7);
  currentUser(token, function (err, curr) {
    if (err) {
      res.locals.error = {
        status: 403,
        msg: 'Not authorized or redis error'
      };
      return next(new Error(res.locals.error));
    }

    isAdmin(curr, function (err, state) {
      if (err) {
        res.locals.error = {
          status: 403,
          msg: 'Not authorized or redis error'
        };
        return next(new Error(res.locals.error));
      }

      if (!state) {
        res.locals.error = {
          status: 403,
          msg: 'Not authorized (must be admin)'
        };
        return next(new Error(res.locals.error));
      }

      return next();
    });
  });
};

module.exports.makeAdmin = function (req, res, next) {
  var token = req.header('Authorization');

  if (!token.startsWith('Bearer ')) {
    res.locals.error = {
      status: 403,
      msg: 'Not authorized (must be admin)'
    };
    return next(new Error(res.locals.error));
  }

  var query = {
    '_id': req.params.id
  };
  User.findOneAndUpdate(query, {
    'role': 'Admin'
  }, {
    upsert: false
  }, function (err, doc) {
    if (err) {
      res.locals.error = err;
      return next(new Error(res.locals.error));
    }

    User.findById(req.params.id).populate('events').exec(function (err, user) {
      if (user) {
        res.locals.data = {
          user: user,
          msg: 'User successfully made an admin' // localStorage.setItem("user", user);

        };
        return next();
      } else {
        console.error(err);
        res.locals.error = {
          status: 404,
          msg: 'That user no longer exists'
        };
        return next();
      }
    });
    return next();
  });
};

module.exports.idMatches = function (req, res, next) {
  var token = req.header('Authorization');

  if (!token.startsWith('Bearer ')) {
    res.locals.error = {
      status: 403,
      msg: 'Not authorized (must be admin)'
    };
    return next(new Error(res.locals.error));
  }

  token = token.substring(7);
  module.exports.currentUser(token, function (err, curr) {
    if (err || curr == null || curr !== req.params.id) {
      res.locals.error = {
        status: 403,
        msg: 'Not authorized'
      };
      return next(new Error(res.locals.error));
    }

    return next();
  });
};

module.exports.login = function (data, callback) {
  hash.checkAgainst(data, function (err, usr) {
    if (err) {
      return callback(err, null);
    }

    if (usr !== null) {
      var tok = randomBytes(64).toString('hex');
      redisClient.set(tok, usr._id.toString()); //, 'EX', 1800); // expire after 30 mins

      return callback(err, Object.assign({}, usr, {
        'token': tok
      }));
    }

    return callback(err, usr);
  });
}; // module.exports.verifySession = (req, res, next)  => {
//       console.log(redisClient.get(req.params.id))
//       redisClient.get(req.params.id, function(error, reply) {
//         console.log(reply);
//         if (reply == req.body.token) {
//           res.locals.data = req.body.token;
//           redisClient.set(req.params.id, req.body.token, 'EX', 1800); // expire after 30 mins
//           return next();
//         } else {
//           res.locals.error = {
//             status: 404,
//             msg: 'Session Expired'
//           };
//           console.log(res.locals.error);
//           return next();
//         }
//     });
// }


module.exports.register = function (data, callback) {
  /* Redo validation scheme... */
  validateUser(data, function (err, validatedUserData) {
    if (err) {
      return callback(err.reason, null);
    }

    User.create(validatedUserData, function (err, user) {
      if (err) {
        return callback(err, null);
      }

      volunteerRegisterEmail(validatedUserData);
      var tok = randomBytes(64).toString('hex');
      user.set('token', tok);
      redisClient.set(tok, user._id.toString()); //, 'EX', 1800); // expire after 30 mins

      return callback(null, Object.assign({}, user._doc, {
        'token': tok
      }));
    });
  });
};

function volunteerRegisterEmail(user) {
  var admins = [];

  if (user.role === 'Volunteer') {
    User.find({
      role: 'Admin'
    }).exec(function (err, users) {
      if (err) {
        // handle error (db error for sure)
        console.error(err);
      }

      users.forEach(function (u) {
        return admins.push(u.email);
      });
      mail.authSend(admins, 'New Volunteer Registered at Enchanted Closet', user.firstName + ' ' + user.lastName + ' just registered as a volunteer! Have a look');
    });
  }
}

module.exports.currentUser = currentUser;
module.exports.isAdmin = isAdmin;