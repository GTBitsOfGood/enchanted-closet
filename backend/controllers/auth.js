const auth = require('../auth');

module.exports.login = (req, res, next) => {
	if (!req.body.email) {
		res.locals.error = {
			status: 400,
			msg: 'An email is required'
		};
		return next();
	}

	if (!req.body.password) {
		res.locals.error = {
			status: 400,
			msg: 'A password is required'
		};
		return next();
	}

	auth.login({
		email: req.body.email,
		password: req.body.password
	}, (error, user) => {
		if (error) {
			res.locals.error = {
				status: 500,
				msg: 'Internal Server Erro'
			};
			return next(new Error(res.locals.error));
		}
		if (user) {
            res.locals.data = {
                user: user
            };
            return next();
		} else {
			res.locals.error = {
				status: 403,
				msg: 'Your email or password is incorrect.'
			};
			return next();
		}
	})
}

module.exports.register = (req, res, next) => {
	auth.register(req.body, (err, user) => {
		console.log(err);
		console.log(user);
		if (err) {
			console.error(err);
			res.locals.error = {
				status: 500
			};
			return next();
		}

		res.locals.data = {
			user: user
		}
		return next();
	});
}