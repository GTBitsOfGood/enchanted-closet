"use strict";

const express = require('express');
const router = express.Router();
const controllers = require('./controllers/');

router.get('/', controllers.core.index);

router.get('/users', controllers.users.index);

module.exports = router;
