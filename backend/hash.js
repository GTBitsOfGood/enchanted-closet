let bcrypt = require('bcrypt');
const User = require('mongoose').model('User');

module.exports.genNew = (password) => {
    return bcrypt.hashSync(password, 15);
}

module.exports.checkAgainst = (data, callback) => {
    User.findOne({
        email: data.email
    }, function (err, user) {
        if (err) {
            return callback(err, null);
        }
        if (user) {
            user.validatePassword(data.password)
                .then(authenticatedUser => callback(null, authenticatedUser))
                .catch(error => callback(error, null));
        } else {
            return callback('Incorrect email/password combination', null);
        }
    });
}
