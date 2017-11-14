let hash = require('./hash');
let user = require('./controllers/users');
let randomBytes = require('crypto').randomBytes;
let isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
let isPhone = /^(\+1 )?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}( x\d{1,5})?$/
let grades = ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
let redisClient = require('redis').createClient();

redisClient.on("error", function (err) {
    console.log("Error " + err);
});

module.exports.login = (data, callback) => {
    hash.checkAgainst(data, function(err, usr){
        if (usr != null) {
            tok = randomBytes(64).toString("hex");
            redisClient.set(tok, usr._id);
            callback(err, Object.assign({}, usr, {"token": tok}));
            return;
        }
        callback(err, usr);
    });
}

module.exports.currentUser = (tok) => {
    let retVal = null;
    redisClient.get(tok, function(err, reply){
        if (reply != null) {
            retVal = reply;
        }
    });
    return retVal;
}

function hasAll(obj, props) {
    for (p in props) {
        if (!(obj[p])) {
            return p;
        }
    }
    return false;
}

function matchesComplexityRequirements(password) {
    if (password.length < 7) return false;
    let hasAlpha = false;
    let hasNum = false;
    for (let i = 0; i < password.length; i++) {
        let c = password.charCodeAt(i);
        if ((c >= 65 && c <= 90) || (c >= 97 && c <= 122)) {
            hasAlpha = true;
        } else if (c >= 48 && c <= 57) {
            hasNum = true;
        }
        if (hasAlpha && hasNum) return true;
    }
    return false;
}

module.exports.register = (data, callback) => {
    let tmp = hasAll(data, ["email", "password", "birthday", "grade", "race", "school", "leader_name", "emergency_contact"]);
    if (tmp) {
        callback({reason: "Data object missing " + tmp + " property"}, false);
        return;
    }
    if (!isEmail.test(data.email)) {
        callback({reason: "Email invalid"}, false);
        return;
    }
    if (!matchesComplexityRequirements(data.password)) {
        callback({reason: "Password doesn't match complexity requirements"}, false)
        return;
    }
    if (grades.indexOf(data.grade) == -1) {
        callback({reason: "Grade is not valid"})
        return;
    }
    //TODO: constraint checks for race, school, leader_name
    tmp = hasAll(data.emergency_contact, ["name", "phone", "relation"]);
    if (tmp) {
        callback({reason: "data.emergency_contact missing " + tmp + " property"}, false);
        return;
    }
    if (!isPhone.test(data.emergency_contact.phone)) {
        callback({reason: "Invalid phone number"}, false);
        return;
    }
    newHash = hash.genNew(data.password);
    delete data.password;
    data.hash = newHash;
    if (user.addNew(data)) {
        delete data.hash;
        callback(null, data);
        return;
    }
    callback(null, true);
}