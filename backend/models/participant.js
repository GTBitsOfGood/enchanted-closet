const mongoose = require('mongoose');
// const Event = mongoose.model('event');

var ParticipantSchema = new mongoose.Schema({
	name: {
		type: String,
		index: true
	},
	email: {
		type: String,
		index: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	phone: {
		type: Number,
		index: true
	},
	birthday: Date,
	grade: String,
	age: Number,
	race: String,
	School: String,
	leader: String,
	emergencyContactName: String,
	emergencyContactPhone: String,
	emergencyContactRelation: String/*,
	pastEvents: [Event]*/
});


let Participant = mongoose.model('Participant', ParticipantSchema);

module.exports = Participant;