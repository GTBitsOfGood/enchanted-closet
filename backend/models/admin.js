const mongoose = require('mongoose');

var AdminSchema = new mongoose.Schema({
	name: {
		type: String,
		index: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: Object,
		required: true
	},
	admin: {
		type: Boolean,
		required: true
	}
});

var Admin = mongoose.model('admin', AdminSchema);

module.exports = Admin;