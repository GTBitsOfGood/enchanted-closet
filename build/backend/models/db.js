"use strict";

require("./event");

require("./user");

require("./systemconfig");

const mongoose = require('mongoose');

const mongoURL = process.env.MONGO_URL;
var mongoDB = mongoURL;
mongoose.set('useCreateIndex', true);
mongoose.connect(mongoDB, {
  useNewUrlParser: true
}); // Get the default connection

var db = mongoose.connection; // Bind connection to error event (to get notification of connection errors)

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
module.exports = db;