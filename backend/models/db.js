const mongoose = require('mongoose');

var mongoDB =  'mongodb://test:passw0rd@ds259802.mlab.com:59802/enchannted_closet_database'
mongoose.connect(mongoDB, {
  useMongoClient: true
});

//Get the default connection
var db = mongoose.connection;

require('./event');
require('./user');

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
