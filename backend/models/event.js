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
        type: Array,
        required: false
    },
    photo: {
        type: String,
        required: false
    },
    attendees: {
        type: String[],
        required: false,
        default: []
    }
});

var Event = mongoose.model('Event', EventSchema);

module.exports = Event;