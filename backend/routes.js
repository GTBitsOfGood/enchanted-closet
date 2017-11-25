"use strict";

const express = require('express');
const router = express.Router();
const controllers = require('./controllers/');
const auth = require('./auth');

router.get('/users', auth.checkAdmin, controllers.users.index);

router.get('/events', controllers.events.index);
router.get('/events/:id', controllers.events.get);
router.post('/events/', auth.checkAdmin, controllers.events.create);
router.delete('/events/:id', auth.checkAdmin, controllers.events.delete);
router.post('/events/:id/present', auth.checkAdmin, controllers.events.present);
router.post('/events/:id/absent', auth.checkAdmin, controllers.events.absent);

router.post('/login', controllers.auth.login);

module.exports = router;
