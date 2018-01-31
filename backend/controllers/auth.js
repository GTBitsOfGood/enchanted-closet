const auth = require('../auth');

module.exports.login = (req, res, next) => {
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
  }, (error, user) => {
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
  })
}

module.exports.register = (req, res, next) => {
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

  if (!req.body.confirm_password) {
    res.locals.error = {
      status: 400,
      msg: 'Please enter the Confirm Password field'
    };
    return next();
  }

  if (req.body.confirm_password !== req.body.password) {
    res.locals.error = {
      status: 400,
      msg: 'Your passwords do not match'
    };
    return next();
  }

  if (!req.body.name) {
    res.locals.error = {
      status: 400,
      msg: 'A name is required'
    };
    return next();
  }

  if (!req.body.age) {
    res.locals.error = {
      status: 400,
      msg: 'An age is required'
    };
    return next();
  }

  if (!req.body.birthday) {
    res.locals.error = {
      status: 400,
      msg: 'A birthday is required'
    };
    return next();
  }

  if (!req.body.emergencycontactname) {
    res.locals.error = {
      status: 400,
      msg: 'An Emergency Contact Name is required'
    };
    return next();
  }

  if (!req.body.emergencycontactphone) {
    res.locals.error = {
      status: 400,
      msg: 'An Emergency Contact Phone number is required'
    };
    return next();
  }

  if (!req.body.emergencycontactrelation) {
    res.locals.error = {
      status: 400,
      msg: 'An Emergency Contact Relation is required'
    };
    return next();
  }

  if (!req.body.race) {
    res.locals.error = {
      status: 400,
      msg: 'Entering your race is required'
    };
    return next();
  }

  if (!req.body.school) {
    res.locals.error = {
      status: 400,
      msg: 'Your school is required'
    };
    return next();
  }

  if (!req.body.leader) {
    res.locals.error = {
      status: 400,
      msg: 'Your leader\'s name is required'
    };
    return next();
  }

  if (!req.body.phone) {
    res.locals.error = {
      status: 400,
      msg: 'A phone number is required'
    };
    return next();
  }

  if (!req.body.password.length > 6) {
    res.locals.error = {
      status: 400,
      msg: 'Password must be at least 7 characters long'
    };
    return next();
  }

  auth.register(req.body, (err, user) => {
    console.log(err);
    console.log(user);
    if (err) {
      res.locals.error = {
	status: 500,
	msg: err
      };
      return next();
    }

    res.locals.data = {
      user: user
    }
    return next();
  });
}
