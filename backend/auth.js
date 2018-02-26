const hash = require('./hash');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const randomBytes = require('crypto').randomBytes;
const redisClient = require('redis').createClient();

const isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
// const isPhone = /^(\+1 )?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}( x\d{1,5})?$/
const grades = ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

const authHeader = 'authorization';

const authError = {
  code: 403,
  msg: 'Invalid authorization credentials'
};

redisClient.on("error", function (err) {
  console.log("Error " + err);
});

const isAdmin = (id, callback) => {
  if (!id) { //catch falsy values like null or empty string
    return callback(null, false);
  }
  User.findById(id, (err, result) => {
    if (!err && result.role == "Admin") {
      return callback(err, true);
    }
    callback(err, false);
  });
}

function lacksAny(obj, props) {
  for (p in props) {
    let k = props[p];
    if (!(obj[k])) {
      return k;
    }
  }
  return null;
}

const matchesComplexityRequirements = password => { // TODO: put these requirements on frontend
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


const validateUser = (data, callback) => {
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
  const capitalized = data.role.charAt(0).toUpperCase() + data.role.slice(1);
  return callback(null, Object.assign(
    {}, data, {"password": hash.genNew(data.password)},
    {"role": capitalized}
  ));
}

const currentUser = (tok, callback) => {
  if (!tok) { //catch falsy values like null, empty string
    return callback(null, null);
  }
  redisClient.get(tok, function(err, reply){
    callback(err, reply)
  });
}

module.exports.idMatchesOrAdmin = (req, res, next) => {
  let token = req.header("Authorization");
  if (!token.startsWith("Bearer ")) {
    res.locals.error = {
      status: 403,
      msg: 'Not authorized (must be admin)'
    };
    return next(new Error(res.locals.error));
  }
  token = token.substring(7);
  currentUser(token, (err, curr) => { // TODO put back in module.exports if broken
    if (err) {
      res.locals.error = {
        status: 403,
        msg: 'Not authorized or redis error'
      };
      return next(new Error(res.locals.error));
    }
    isAdmin(curr, (err, state) => { // TODO see above
      if (err) {
        res.locals.error = {
          status: 403,
          msg: 'Not authorized or redis error'
        };
        return next(new Error(res.locals.error));
      }
      if (curr == null || (curr != req.id && !state)) {
        res.locals.error = {
          status: 403,
          msg: 'Not authorized'
        };
        return next(new Error(res.locals.error));
      }
      return next();
    });
  });
}

module.exports.checkAdmin = (req, res, next) => {
  let token = req.header("Authorization");
  if (!token.startsWith("Bearer ")) {
    res.locals.error = {
      status: 403,
      msg: 'Not authorized (must be admin)'
    };
    return next(new Error(res.locals.error));
  }
  token = token.substring(7);
  currentUser(token, (err, curr) => {
    if (err) {
      res.locals.error = {
        status: 403,
        msg: 'Not authorized or redis error'
      };
      return next(new Error(res.locals.error));
    }
    isAdmin(curr, (err, state) => {
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
}

module.exports.makeAdmin = (req, res, next) => {
  let token = req.header("Authorization");
  if (!token.startsWith("Bearer ")) {
    res.locals.error = {
      status: 403,
      msg: 'Not authorized (must be admin)'
    };
    return next(new Error(res.locals.error));
  }
  var query = {'_id' : req.params.id};
  User.findOneAndUpdate(query, {"role" : "Admin"}, {upsert:false}, function(err, doc) {
    if (err) {
      res.locals.error = err;
      return next(new Error(res.locals.error));
    }
    return next();
  });
}

module.exports.idMatches = (req, res, next) => {
  let token = req.header("Authorization");
  if (!token.startsWith("Bearer ")) {
    res.locals.error = {
      status: 403,
      msg: 'Not authorized (must be admin)'
    };
    return next(new Error(res.locals.error));
  }
  token = token.substring(7);
  module.exports.currentUser(token, (err, curr) => {
    if (err || curr == null || curr != req.params.id) {
      res.locals.error = {
        status: 403,
        msg: 'Not authorized'
      };
      return next(new Error(res.locals.error));
    }
    return next();
  });
}

module.exports.login = (data, callback) => {
  hash.checkAgainst(data, function(err, usr) {
    if (err) {
      console.error(err);
      return callback(err, null);
    }
    if (usr !== null) {
      let tok = randomBytes(64).toString("hex");
      redisClient.set(tok, usr._id);
      return callback(err, Object.assign({}, usr, {"token": tok}));
    }
    return callback(err, usr);
  });
}

module.exports.register = (data, callback) => {
  /* Redo validation scheme... */

  validateUser(data, (err, validatedUserData) => {
    if (err) return callback(err.reason, null);
    User.create(validatedUserData, (err, user) => {
      if (err) return callback(err, null);
      return callback(null, user);
    });
  });
}


module.exports.currentUser = currentUser;
module.exports.isAdmin = isAdmin;
