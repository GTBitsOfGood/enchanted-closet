const express = require('express');
const router = express.Router();
const controllers = require('./controllers/');


router.get('/users', controllers.users.index);
router.get('/events', controllers.events.index);
router.get('/events/:id', controllers.events.get);

module.exports = router;
