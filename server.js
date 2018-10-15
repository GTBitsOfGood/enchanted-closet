/* eslint-disable */
"use strict";

require('dotenv').config()

const path = require('path');
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const app = express();
const PORT = 3001;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(favicon(__dirname + '/public/images/favicon/favicon.ico'));
app.use(compression());
app.use(helmet());
const db = require('./backend/models/db');
const api = require('./backend/routes');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api); // Server Routing
app.get('/*', (req, res) => { // Else, give to React
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(PORT, error => {
  error
  ? console.error(error)
  : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});
