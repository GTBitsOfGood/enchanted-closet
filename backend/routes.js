"use strict";

const express = require('express');
const router = express.Router();
const controllers = require('./controllers/');
const reporting = require('./reporting');
const auth = require('./auth');
const multer = require('multer');
//limit file uploads to 5 MB
var upload = multer({limits: {fileSize: 5000000}});

router.post('/login', controllers.auth.login);
router.post('/register', controllers.auth.register);

router.get('/users', [auth.hasValidToken, auth.isAdmin], controllers.users.index);
router.get('/users/:id', [auth.hasValidToken, auth.isAdminOrIDMatches], controllers.users.get);
//more complex permissions checking (need admin to create admin) done in function
router.post('/users/new', controllers.users.register);
router.delete('/users/:id', [auth.hasValidToken, auth.isAdminOrIDMatches], controllers.users.delete);
router.post('/users/:id', [auth.hasValidToken, auth.isAdminOrIDMatches], controllers.users.update);

router.get('/dashboard', controllers.admin.cards);

router.get('/events', [auth.hasValidToken], controllers.events.index);
router.get('/events/:id', [auth.hasValidToken], controllers.events.get);
router.post('/events/', [auth.hasValidToken, auth.isAdmin], controllers.events.create);
router.delete('/events/:id', [auth.hasValidToken, auth.isAdmin], controllers.events.delete);
router.post('/events/:id/present', [auth.hasValidToken, auth.isAdmin], controllers.events.present);
router.post('/events/:id/absent', [auth.hasValidToken, auth.isAdmin], controllers.events.absent);
router.get('/events/:id/report', auth.checkAdmin, reporting.generateReport);

router.post('/upload/picture/event/:id', [auth.hasValidToken, auth.checkAdmin, upload], controllers.upload.eventPic);
router.post('/upload/picture/event/:id', [auth.hasValidToken, auth.isIDMatch, upload], controllers.upload.eventPic);

module.exports = router;
