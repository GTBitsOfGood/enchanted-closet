const mongoose = require('Mongoose');
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
<<<<<<< HEAD:backend/models/participant.js
	}
	phone {
		type:String,
		index:true
=======
	},
	phone: {
		type: Number,
		index: true
>>>>>>> ffb31b5ae9a1380033dd5617551511e3b25f1b8d:backend/model/participant.js
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
