"use strict";

require('dotenv').config()

const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const api = require('./backend/routes');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
    return response.sendFile(__dirname + '/public/index.html');
});

app.use('/api', api);

app.listen(PORT, error => {
    error
    ? console.error(error)
    : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});
