const mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
    name: {
        type: String,
        index: false,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    datetime: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    presenters: {
        type: [mongoose.Schema.Types.Mixed],
        required: false
    },
    photo: {
        type: String,
        required: false
    },
    participants: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
    }
});

var Event = mongoose.model('Event', EventSchema);

module.exports = Event;
