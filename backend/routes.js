'use strict'

const express = require('express')
const router = express.Router()
const controllers = require('./controllers/')
const auth = require('./auth')
const multer = require('multer')

// TODO: consider changing filename

const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploaded/users')
  },
  filename: function (req, file, cb) {
    let names = file.mimetype.split('/')
    cb(null, req.params.id + '.' + names[names.length - 1])
  }
})

const eventStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploaded/events')
  },
  filename: function (req, file, cb) {
    let names = file.mimetype.split('/')
    cb(null, req.params.id + '.' + names[names.length - 1])
  }
})

const userUpload = multer({ storage: userStorage })
const eventUpload = multer({ storage: eventStorage })

router.post('/login', controllers.auth.login)
router.post('/register', controllers.auth.register)
router.post('/reset-password', controllers.auth.resetPassword)
// router.post('/session/:id', auth.verifySession)

router.get('/users', auth.checkAdmin, controllers.users.index)
router.get('/users/:id', auth.idMatchesOrAdmin, controllers.users.get)
router.get('/users/admin/:id', auth.makeAdmin, controllers.users.get)
// more complex permissions checking (need admin to create admin) done in function
router.post('/users', controllers.users.create)
router.delete('/users/:id', auth.idMatchesOrAdmin, controllers.users.delete)
router.put('/users/:id', auth.idMatches, controllers.users.update)

router.get('/dashboard', auth.checkAdmin, controllers.admin.cards)

router.get('/events/:eventID/register/:userID', controllers.users.registerevent)
router.get('/events/:eventID/cancel/:userID', controllers.users.cancelevent)
router.get('/events/:eventID/confirm/:userID', auth.checkAdmin, controllers.users.confirmRegistration)
router.get('/events/:eventID/deny/:userID', auth.checkAdmin, controllers.users.denyRegistration)

router.get('/events', controllers.events.fetchFutureEvents)
router.get('/eventsPast', controllers.events.fetchPastEvents)

router.get('/events/:id', controllers.events.get)
router.post('/events', auth.checkAdmin, controllers.events.create)
router.post('/events/uploadImage/:id', eventUpload.single('image'), controllers.events.upload)
router.post('/users/uploadImage/:id', userUpload.single('image'), controllers.users.upload)
router.delete('/events/:id', auth.checkAdmin, controllers.events.delete)
router.get('/events/:eventID/present/:userID', auth.checkAdmin, controllers.events.present)
router.get('/events/:eventID/absent/:userID', auth.checkAdmin, controllers.events.absent)
router.put('/events/:id', auth.checkAdmin, controllers.events.update)
router.get('/events/:id/report', controllers.reporting.eventReport)
router.get('/report/:year', controllers.reporting.yearReport)
router.get('/report/:year/:month', controllers.reporting.monthReport)
router.get('/reports', auth.checkAdmin, controllers.reporting.index)

// Package and finish
router.use((req, res, next) => {
  if (res.locals.data) {
    let response = Object.assign({}, res.locals.data, {
      'status': 'ok'
    })
    return res.status(200).json(response)
  } else if (res.locals.error) { // Any errors thrown are be handled below, but because we're bad not all errors are thrown >:(
    let statusCode = res.locals.error.code || res.locals.error.status
    statusCode = statusCode || 500
    if (res.locals.error.msg instanceof Error) {
      // Extract message from Error object
      res.locals.error.msg = res.locals.error.msg.message
    }
    let response = Object.assign({}, res.locals.error, {
      'status': 'error'
    })
    return res.status(statusCode).json(response)
  } else {
    // not every error should be a generic 500 error!!!!!!!!!!!!
    console.error('generic server error')
    return res.status(500).json({
      'status': 'error',
      'code': 500,
      'msg': 'Internal Server Error'
    })
  }
})

module.exports = router
