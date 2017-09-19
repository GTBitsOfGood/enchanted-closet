let bcrypt = require('bcrypt');
let users = require('models/user');

module.exports.genNew = (password) => {
    return bcrypt.hashSync(password);
}

module.exports.checkAgainst = (data, callback) => {
    users.findByEmail(data.email, function(user, err){
        if (err) {
            callback(null, err);
            return;
        }
        if (!bcrypt.compareSync(password, user.passHash)) {
            callback(null, new Error("Password incorrect"));
            return;
        }
        let tmp = user;
        delete tmp.passHash;
        callback(tmp, null);
    });
}