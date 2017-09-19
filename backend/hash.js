let bcrypt = require('bcrypt');
let users = require('models/user');

module.exports.genNew = (password) => {
    return bcrypt.hashSync(password);
}

module.exports.checkAgainst = (email, password) => {
    users.findByEmail(email, function(user, err){
        if (err) {
            return false;
        }
        return bcrypt.compareSync(password, user.passHash);
    });
}