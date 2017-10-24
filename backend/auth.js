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
    hash.checkAgainst(data, function(err, usr) {
        if (usr !== null) {
            let tok = randomBytes(64).toString("hex");
            redisClient.set(tok, usr._id);
            return callback(err, Object.assign({}, usr, {"token": tok}));
        }
        return callback(err, usr);
    });
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
    //TODO: implement
    return true;
}

module.exports.register = (data, callback) => {
    let tmp = hasAll(data, ["email", "password", "birthday", "grade", "race", "school", "leader_name", "emergency_contact"]);
    if (tmp) {
        return callback({reason: "Data object missing " + tmp + " property"}, false);
    }
    if (!isEmail.test(data.email)) {
        return callback({reason: "Email invalid"}, false);
    }
    if (!matchesComplexityRequirements(data.password)) {
        return callback({reason: "Password doesn't match complexity requirements"}, false);
    }
    if (grades.indexOf(data.grade) == -1) {
        return callback({reason: "Grade is not valid"});
    }
    //TODO: constraint checks for race, school, leader_name
    tmp = hasAll(data.emergency_contact, ["name", "phone", "relation"]);
    if (tmp) {
        return callback({reason: "data.emergency_contact missing " + tmp + " property"}, false);
    }
    if (!isPhone.test(data.emergency_contact.phone)) {
        return callback({reason: "Invalid phone number"}, false);
    }
    newHash = hash.genNew(data.password);
    delete data.password;
    data.hash = newHash;
    if (user.addNew(data)) {
        delete data.hash;
        return callback(null, data);
    }
    return callback(null, true);
}