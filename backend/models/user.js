const mongoose = require('mongoose');
// const Event = mongoose.model('event');

var UserSchema = new mongoose.Schema({
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
	role: {
		type: String,
		enum: ['Participant', 'Volunteer', 'Admin'],
		index: true,
		default: 'Participant',
		required: true
	},
	birthday: Date,
	grade: String,
	age: Number,
	race: String,
	school: String,
	leader: String,
	emergencyContactName: String,
	emergencyContactPhone: String,
	emergencyContactRelation: String,
	pastEvents: [mongoose.Schema.Types.ObjectId]
});


let User = mongoose.model('User', UserSchema);

module.exports = User;
