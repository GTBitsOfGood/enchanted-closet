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

  if (!req.body.role) {
    console.log(req.body);
    res.locals.error = {
      status: 400,
      msg: 'No user role specified'
    };
    return next();
  }

  // Leaving this in to make someone's life easier down the road

  // if (!req.body.age) {
  //   res.locals.error = {
  //     status: 400,
  //     msg: 'An age is required'
  //   };
  //   return next();
  // }

  // if (!req.body.birthday) {
  //   res.locals.error = {
  //     status: 400,
  //     msg: 'A birthday is required'
  //   };
  //   return next();
  // }

  // if (!req.body.emergencycontactname) {
  //   res.locals.error = {
  //     status: 400,
  //     msg: 'An Emergency Contact Name is required'
  //   };
  //   return next();
  // }

  // if (!req.body.emergencycontactphone) {
  //   res.locals.error = {
  //     status: 400,
  //     msg: 'An Emergency Contact Phone number is required'
  //   };
  //   return next();
  // }

  // if (!req.body.emergencycontactrelation) {
  //   res.locals.error = {
  //     status: 400,
  //     msg: 'An Emergency Contact Relation is required'
  //   };
  //   return next();
  // }

  // if (!req.body.race) {
  //   res.locals.error = {
  //     status: 400,
  //     msg: 'Entering your race is required'
  //   };
  //   return next();
  // }

  // if (!req.body.school) {
  //   res.locals.error = {
  //     status: 400,
  //     msg: 'Your school is required'
  //   };
  //   return next();
  // }

  // if (!req.body.leader) {
  //   res.locals.error = {
  //     status: 400,
  //     msg: 'Your leader\'s name is required'
  //   };
  //   return next();
  // }

  // if (!req.body.phone) {
  //   res.locals.error = {
  //     status: 400,
  //     msg: 'A phone number is required'
  //   };
  //   return next();
  // }

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
