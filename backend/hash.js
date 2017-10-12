let bcrypt = require('bcrypt');
let users = require('models/user');

module.exports.genNew = (password) => {
    return bcrypt.hashSync(password, 15);
}

module.exports.checkAgainst = (data, callback) => {
    users.findByEmail(data.email, function(user, err){
        if (err) {
            callback(null, err);
            return false;
        }
        bcrypt.compare(data.password, user.passHash, (err, same) => {
            if (err) {
                callback(null, err);
                return false;
            }
            if (!same) {
                callback(null, null);
                return false;
            }
        });
        let tmp = user;
        delete tmp.passHash;
        callback(tmp, null);
        return true;
    });
    return false;
}