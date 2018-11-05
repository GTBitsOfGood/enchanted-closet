"use strict";

require("./event");

require("./user");

require("./systemconfig");

var mongoose = require('mongoose');

var mongoURL = process.env.MONGO_URL;
var mongoDB = mongoURL;
mongoose.connect(mongoDB, {
  useNewUrlParser: true
}); // Get the default connection

var db = mongoose.connection; // Bind connection to error event (to get notification of connection errors)

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
module.exports = db;