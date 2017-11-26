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
            bcrypt.compare(data.password, user.password, (err, authenticated) => {
                if (err) {
                    return callback(err, null);
                }
                if (authenticated) {
                    // This is a hack to make sure we don't create a reference, but instead literally copy the object
                    let temporaryUser = JSON.parse(JSON.stringify(user));
                    delete temporaryUser.password;
                    return callback(null, temporaryUser);
                } else {
                    return callback(null, null);
                }
            });
        } else {
            return callback(null, null);            
        }
    });
}