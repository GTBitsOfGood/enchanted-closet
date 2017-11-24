"use strict";

const express = require('express');
const router = express.Router();
const controllers = require('./controllers/');

router.get('/users', controllers.users.index);
router.get('/events', controllers.events.index);
router.get('/events/:id', controllers.events.get);
router.put('/events/:id', controllers.events.update);
router.post('/events/', controllers.events.create);
router.delete('/events/:id', controllers.events.delete);
router.post('/events/:id/present', controllers.events.present);
router.post('/events/:id/absent', controllers.events.absent);

router.post('/login', controllers.auth.login);
router.post('/register', controllers.auth.register);

module.exports = router;
