const bcrypt = require('bcrypt');
const User = require('mongoose').model('User');

module.exports.genNew = (password) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
}

module.exports.checkAgainst = (data, callback) => {
    User.findOne({
        email: data.email
    }, function (err, user) {
        if (err) { // not found TODO: SAM throw no email
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
