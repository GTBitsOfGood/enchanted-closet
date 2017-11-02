"use strict";

require('dotenv').config()

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

<<<<<<< HEAD
const bodyParser = require('body-parser')
=======
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
>>>>>>> 2433daea710b59d8c38a88814c673eaf1cded570

const db = require('./backend/models/db');
const api = require('./backend/routes');

app.use(express.static(path.join(__dirname, 'public')));

<<<<<<< HEAD
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

=======
>>>>>>> 2433daea710b59d8c38a88814c673eaf1cded570
app.use('/api', api);
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/public/index.html'); // For React/Redux
});
app.use((req, res, next) => {
	if (res.locals.data) {
		let response = Object.assign({}, res.locals.data, {
			'status': 'ok'
		});
		return res.status(200).json(response);
	} else if (res.locals.error) {
		let statusCode = res.locals.error.status || 500;
		let response = Object.assign({}, res.locals.error, {
			'status': 'error'
		});
		return res.status(statusCode).json(response);
	} else {
		return res.status(500).json({
			'status': 'error',
			'msg': 'Internal Server Error'
		});
	}
});


app.listen(PORT, error => {
    error
    ? console.error(error)
    : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});