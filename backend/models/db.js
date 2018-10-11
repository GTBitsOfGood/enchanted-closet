import './event'
import './user'
import './systemconfig'

const mongoose = require('mongoose')

const mongoURL = 'mongodb://127.0.0.1/enchannted_closet_database'

var mongoDB = mongoURL
mongoose.connect(mongoDB, {
  useMongoClient: true
})

// Get the default connection
var db = mongoose.connection

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

module.exports = db
