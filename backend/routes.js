"use strict";

const express = require('express');
const router = express.Router();
const controllers = require('./controllers/');
const auth = require('./auth');

router.post('/login', controllers.auth.login);
router.post('/register', controllers.auth.register);


router.get('/users', [auth.checkAdmin], controllers.users.index);
router.get('/users/:id', [auth.idMatchesOrAdmin], controllers.users.get);
//more complex permissions checking (need admin to create admin) done in function
router.post('/users/new', controllers.users.register);
router.delete('/users/:id', [auth.idMatchesOrAdmin], controllers.users.delete);
router.post('/users/:id', [auth.idMatches], controllers.users.update);

router.get('/dashboard', [auth.hasValidToken, auth.isAdmin], controllers.admin.cards);

router.get('/events', controllers.events.index);
router.get('/events/:id', controllers.events.get);
router.post('/events/', [auth.checkAdmin], controllers.events.create);
router.delete('/events/:id', [auth.checkAdmin], controllers.events.delete);
router.post('/events/:id/present/:userID', [auth.checkAdmin], controllers.events.present);
router.post('/events/:id/absent/:userID', [auth.checkAdmin], controllers.events.absent);


module.exports = router;
