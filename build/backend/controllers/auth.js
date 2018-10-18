"use strict";

var auth = require('../auth');

module.exports.login = function (req, res, next) {
  if (!req.body.email) {
    res.locals.error = {
      status: 400,
      msg: 'An email is required'
    };
    return next();
  }

  if (!req.body.password) {
    res.locals.error = {
      status: 400,
      msg: 'A password is required'
    };
    return next();
  }

  auth.login({
    email: req.body.email,
    password: req.body.password
  }, function (error, user) {
    if (error) {
      res.locals.error = {
        status: 403,
        msg: error
      };
      return next(new Error(res.locals.error));
    }

    if (user) {
      res.locals.data = {
        user: user
      };
      return next();
    } else {
      res.locals.error = {
        status: 403,
        msg: 'Your email or password is incorrect.'
      };
      return next();
    }
  });
};

module.exports.register = function (req, res, next) {
  if (!req.body.email) {
    res.locals.error = {
      status: 400,
      msg: 'An email is required'
    };
    return next();
  }

  if (!req.body.password) {
    res.locals.error = {
      status: 400,
      msg: 'A password is required'
    };
    return next();
  }

  if (!req.body.role) {
    res.locals.error = {
      status: 400,
      msg: 'No user role specified'
    };
    return next();
  }

  auth.register(req.body, function (err, user) {
    if (err) {
      if (err.code === 11000) {
        // 11000 is duplicate key
        res.locals.error = {
          status: 500,
          msg: 'A user with that email already exists'
        };
      } else {
        res.locals.error = {
          status: 500,
          msg: err
        };
      }

      return next();
    }

    res.locals.data = {
      user: user
    };
    return next();
  });
};