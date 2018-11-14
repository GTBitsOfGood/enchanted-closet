const auth = require('../auth')
const User = require('mongoose').model('User')
const hash = require('../hash')
const mail = require('../gmailAuth')

module.exports.login = (req, res, next) => {
  if (!req.body.email) {
    res.locals.error = {
      status: 400,
      msg: 'An email is required'
    }
    return next()
  }

  if (!req.body.password) {
    res.locals.error = {
      status: 400,
      msg: 'A password is required'
    }
    return next()
  }

  auth.login({
    email: req.body.email,
    password: req.body.password
  }, (error, user) => {
    if (error) {
      res.locals.error = {
        status: 403,
        msg: error
      }
      return next(new Error(res.locals.error))
    }
    if (user) {
      res.locals.data = {
        user: user
      }
      return next()
    } else {
      res.locals.error = {
        status: 403,
        msg: 'Your email or password is incorrect.'
      }
      return next()
    }
  })
}

module.exports.register = (req, res, next) => {
  if (!req.body.email) {
    res.locals.error = {
      status: 400,
      msg: 'An email is required'
    }
    return next()
  }

  if (!req.body.password) {
    res.locals.error = {
      status: 400,
      msg: 'A password is required'
    }
    return next()
  }

  if (!req.body.role) {
    res.locals.error = {
      status: 400,
      msg: 'No user role specified'
    }
    return next()
  }

  auth.register(req.body, (err, user) => {
    if (err) {
      if (err.code === 11000) { // 11000 is duplicate key
        res.locals.error = {
          status: 500,
          msg: 'A user with that email already exists'
        }
      } else {
        res.locals.error = {
          status: 500,
          msg: err
        }
      }
      return next()
    }
    res.locals.data = {
      user: user
    }
    return next()
  })
}

// FIXME this is a stub for the frontend, need real implementation
module.exports.resetPassword = (req, res, next) => {
  if (!req.body.email) {
    res.locals.error = {
      code: 400,
      msg: 'Email field required'
    }
    return next()
  }

  User.findOne({ email: req.body.email }, (err, result) => {
    if (result) {
      makePassword().then(pass => {
        const plainPassword = pass[1]
        result.password = pass[0]
        result.passwordReset = true
        result.save((err, result) => {
          if (result) {
            const msg = constructMessage(plainPassword)
            mail.authSend(result.email, 'Password Reset', msg)
            res.locals.data = {
              status: 400,
              msg: 'Password reset'
            }
            return next()
          } else {
            res.locals.error = {
              status: 500,
              msg: err
            }
            return next()
          }
        })
      }, err => {
        res.locals.error = {
          status: 500,
          msg: err
        }
        return next()
      })
    } else {
      // fail safe
      res.locals.error = {
        status: 500,
        msg: err
      }
      return next()
    }
  })
}

function constructMessage(password) {
  return 'Here is your temporary password \n' +
    password + '\n' +
    'please log in and change it immediately'
}

function makePassword() {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

  for (let i = 0; i < 15; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return Promise.resolve([hash.genNew(text), text]) // yes hacky, no I don't care
}
