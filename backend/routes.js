"use strict";

const express = require('express');
const router = express.Router();
const controllers = require('./controllers/');

router.get('/', controllers.core.index);

router.get('/users', controllers.users.index);

router.get('/login', controllers.auth.login);

module.exports = router;
