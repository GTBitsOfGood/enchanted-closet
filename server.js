"use strict";

require('dotenv').config()

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(favicon(__dirname + '/public/images/favicon/favicon.ico'));

const db = require('./backend/models/db');
const api = require('./backend/routes');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api); // Server Routing
app.get('/*', (request, response) => { // Else, give to React
  // Using regex in route is bugged, hack below
  console.log(request)
  console.log(request.path.includes('/api'))
  if (!request.path.includes('/api'))
    response.sendFile(__dirname + '/public/index.html');
  else
    console.log('nah')
});

// TODO: Unreachable? What is this?
app.use((req, res, next) => {
  console.log(req);
  if (res.locals.data) {
    let response = Object.assign({}, res.locals.data, {
      'status': 'ok'
    });
    return res.status(200).json(response);
  } else if (res.locals.error) {
    console.log(res.locals.error);
    let statusCode = res.locals.error.code || 500;
    let response = Object.assign({}, res.locals.error, {
      'status': 'error'
    });
    return res.status(statusCode).json(response);
  } else {
    console.log('generic server error');
    return res.status(500).json({
      'status': 'error',
      'code': 500,
      'msg': 'Internal Server Error'
    });
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.log(err);
  if (res.locals.error) {
    let statusCode = res.locals.error.code || 500;
    let response = Object.assign({}, res.locals.error, {
      'status': 'error'
    });
    return res.status(statusCode).json(response);
  } else {
    return res.status(500).json({
      'status': 'error',
      'code': 500,
      'msg': 'Internal Server Error'
    });
  }
});

app.listen(PORT, error => {
  error
  ? console.error(error)
  : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});
