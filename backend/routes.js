"use strict";

const express = require('express');
const router = express.Router();
const controllers = require('./controllers/');
const reporting = require('./reporting');
const auth = require('./auth')

router.get('/users', controllers.users.index);
router.get('/events', controllers.events.index);
router.get('/events/:id', controllers.events.get);
router.delete('/events/:id', controllers.events.delete);
router.post('/attendance/present/:eventId/:userId', controllers.events.markPresentAt);

router.get('/events/:id/report', auth.checkAdmin, reporting.generateReport);

module.exports = router;
