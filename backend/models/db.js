const mongoose = require('mongoose');

var mongoDB =  'mongodb://test:12345@localhost/enchanted_closet'
mongoose.connect(mongoDB, {
  useMongoClient: true
});

//Get the default connection
var db = mongoose.connection;

require('./event');
require('./user');
import './systemconfig'

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
