"use strict";

const express = require('express');
const router = express.Router();
const controllers = require('./controllers/');
const auth = require('./auth')

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

router.get('/events', controllers.events.fetchFutureEvents);
router.get('/eventsPast', controllers.events.fetchPastEvents);

router.get('/events/:id', controllers.events.get);
router.post('/events/', auth.checkAdmin, controllers.events.create);
router.delete('/events/:id', auth.checkAdmin, controllers.events.delete);
router.get('/events/:eventID/present/:userID', auth.checkAdmin, controllers.events.present);
router.get('/events/:eventID/absent/:userID', auth.checkAdmin, controllers.events.absent);
router.put('/events/:id', auth.checkAdmin, controllers.events.update);
router.get('/events/:id/report', controllers.reporting.eventReport);
router.get('/report/year', controllers.reporting.yearReport);

router.use((req, res, next) => {
  if (res.locals.data) {
    let response = Object.assign({}, res.locals.data, {
      'status': 'ok'
    });
    return res.status(200).json(response);
  } else if (res.locals.error) {
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

// Error handler
router.use((err, req, res, next) => {
  console.log(err);
  if (res.locals.error) {
    let statusCode = res.locals.error.code || 500;
    let response = Object.assign({}, res.locals.error, {
      'status': 'error'
    });
    return res.status(statusCode).json(response);
  } else {
    return res.status(500).json({
      'status': 'error',
      'code': 500,
      'msg': 'Internal Server Error'
    });
  }
});


module.exports = router;
