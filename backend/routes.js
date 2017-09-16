"use strict";

const express = require('express');
const router = express.Router();
const controllers = require('./controllers/');

router.use('/users', controllers.users.index);

module.exports = router;
