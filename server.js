"use strict";

require('dotenv').config()

const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./backend/routes');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.listen(PORT, error => {
    error
    ? console.error(error)
    : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});
