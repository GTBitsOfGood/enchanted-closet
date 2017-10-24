"use strict";

const express = require('express');
const router = express.Router();
const controllers = require('./controllers/');

router.get('/users', controllers.users.index);
router.get('/events', controllers.events.index);
router.get('/events/:id', controllers.events.get);
router.delete('/events/:id', controllers.events.delete);

router.post('/login', controllers.auth.login);

module.exports = router;
