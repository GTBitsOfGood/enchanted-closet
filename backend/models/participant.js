const mongoose = require('Mongoose');
//require Event 


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
	password = {
		type: Object,
		required: true
	}
	phone {
		type:String,
		index:true
	},
	birthday: Date,
	grade: String,
	age: Number,
	race: String,
	School: String,
	leader: String,
	emergencyContactName: String,
	emergencyContactPhone: String,
	emergencyContactRelation: String,
	pastEvents: [Events]
});

//to load from a controller would do var Participant = require('/backend/model/participant').Participant;
var Participant = mongoose.model('Participant', ParticipantSchema);

module.exports = {
	Participant: Participant
}

