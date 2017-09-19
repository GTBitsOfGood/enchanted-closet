let hash = require('hash');
let isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

module.exports.login = hash.checkAgainst;

function hasAll(obj, props) {
    for (p in props) {
        if (!(obj[p])) {
            return p;
        }
    }
    return false;
}

module.exports.register = (data, callback) => {
    let tmp = hasAll(data, ["email", "password", "birthday", "grade", "race", "school", "leader_name", "emergency_contact"]);
    if (tmp) {
        callback({reason: "Data object missing " + tmp + " property"}, false);
    }
    if (!isEmail.test(data.email)) {
        callback({reason: "Email invalid"}, false);
    }
}