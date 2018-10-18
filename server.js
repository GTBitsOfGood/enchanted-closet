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
const PORT = 3000;

let DIR;
let STATIC_DIR;
let db;
let api;
if (process.env.NODE_ENV === 'production') {
  console.log('prod')
  DIR = path.join(__dirname, 'build');
  // STATIC_DIR = path.join(__dirname, 'build/frontend')
  STATIC_DIR = path.join(__dirname, 'public');
  console.log(DIR)
  console.log(path.join(STATIC_DIR, '/index.html'));
} else {
  STATIC_DIR = path.join(__dirname, 'public');
  DIR = __dirname;
  // app.use(express.static(STATIC_DIR));

  console.log(DIR)
}

db = require(DIR + '/backend/models/db');
api = require(path.join(DIR, '/backend/routes'));
app.use(express.static(STATIC_DIR));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());
app.use(favicon(STATIC_DIR + '/favicon.ico'));

app.use('/api', api); // Server Routing
app.get('/*', (req, res) => { // Else, give to React
  res.sendFile(path.join(STATIC_DIR, '/index.html'));
});

app.listen(PORT, error => {
  error
  ? console.error(error)
  : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});
