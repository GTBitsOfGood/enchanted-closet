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
  response.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, error => {
  error
  ? console.error(error)
  : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});
