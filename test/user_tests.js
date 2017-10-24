const assert = require('assert');
var Admin = require('../backend/model/admin');

describe('Creating admin', () => {
	it('saves an admin user', (done) => {
		var newAdmin = new Admin({name:'Admin', email:'test@test.com', password:"1234", admin:true});

		newAdmin.save()
			.then(() => {
				assert(!newAdmin.isNew);
				done();
		});
	});
	
});

//Todo test creating a participant

