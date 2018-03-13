"use strict";

const express = require('express');
const router = express.Router();
const controllers = require('./controllers/');
const auth = require('./auth');
const multer = require('multer');

const userStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploaded/users');
    },
    filename: function(req, file, cb) {
        let names = file.mimetype.split('/');
        cb(null, req.params.id + '.' + names[names.length - 1]);
    }
});

const eventStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploaded/events');
    },
    filename: function(req, file, cb) {
        let names = file.mimetype.split('/');
        cb(null, req.params.id + '.' + names[names.length - 1]);
    }
});

const userUpload = multer({storage: userStorage});
const eventUpload = multer({storage: eventStorage});

router.post('/login', controllers.auth.login);
router.post('/register', controllers.auth.register);

router.get('/users', auth.checkAdmin, controllers.users.index);
router.get('/users/:id', auth.idMatchesOrAdmin, controllers.users.get);
router.get('/users/admin/:id', auth.makeAdmin, controllers.users.get);
//more complex permissions checking (need admin to create admin) done in function
router.post('/users', controllers.users.create);
router.delete('/users/:id', auth.idMatchesOrAdmin, controllers.users.delete);
router.put('/users/:id', auth.idMatches, controllers.users.update);

router.get('/dashboard', auth.checkAdmin, controllers.admin.cards);

router.get('/events/:eventID/register/:userID', controllers.users.registerevent);
router.get('/events/:eventID/cancel/:userID', controllers.users.cancelevent);
router.get('/events/:eventID/confirm/:userID', auth.checkAdmin, controllers.users.confirmRegistration);

router.get('/events', controllers.events.fetchFutureEvents);
router.get('/eventsPast', controllers.events.fetchPastEvents);

router.get('/events/:id', controllers.events.get);
router.post('/events/', auth.checkAdmin, controllers.events.create);
router.delete('/events/:id', auth.checkAdmin, controllers.events.delete);
router.post('/events/uploadImage/:id', eventUpload.single('image'), controllers.events.upload);
router.post('/users/uploadImage/:id', userUpload.single('image'), controllers.users.upload);
router.get('/events/:eventID/present/:userID', auth.checkAdmin, controllers.events.present);
router.get('/events/:eventID/absent/:userID', auth.checkAdmin, controllers.events.absent);
router.put('/events/:id', auth.checkAdmin, controllers.events.update);
router.get('/events/:id/report', controllers.reporting.eventReport);
router.get('/report/year', controllers.reporting.yearReport);

// Package and finish
router.use((req, res, next) => {
  if (res.locals.data) {
    let response = Object.assign({}, res.locals.data, {
      'status': 'ok'
    });
    return res.status(200).json(response);
  } else if (res.locals.error) {
    console.error(res.locals.error);
    let statusCode = res.locals.error.code || 500;
    let response = Object.assign({}, res.locals.error, {
      'status': 'error'
    });
    return res.status(statusCode).json(response);
  } else {
    console.log('generic server error');
    return res.status(500).json({
      'status': 'error',
      'code': 500,
      'msg': 'Internal Server Error'
    });
  }
});

module.exports = router;
