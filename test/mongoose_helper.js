const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

before((done)=> {
	mongoose.connect("mongodb://localhost/test");
	mongoose.connection
	.once('open', () => {done(); })
	.on('error', (error) => {
		console.warn('Error', error);
	});
});

beforeEach((done)=> {
	mongoose.connection.collections.admins.drop(()=>{
		done();
	})
});