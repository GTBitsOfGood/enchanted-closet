const assert = require('assert');
var User = require('../backend/model/user');

describe('Creating user', () => {
	it('saves a user', (done) => {
		var newUser = new User({name:'Admin', email:'test@test.com', password:"1234", role: 'Admin'});

		newUser.save()
			.then(() => {
				assert(!newUser.isNew);
				done();
		});
	});
	
});

//Todo test creating a participant

