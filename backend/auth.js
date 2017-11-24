let hash = require('./hash');

const mongoose = require('mongoose');
const User = mongoose.model('User');
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
        if (err) {
            console.error(err);
            return callback(err, null);
        }
        if (usr !== null) {
            let tok = randomBytes(64).toString("hex");
            redisClient.set(tok, usr._id);
            return callback(err, Object.assign({}, usr, {"token": tok}));
        }
        return callback(err, usr);
    });
}

module.exports.isAdmin = (id) => {
    if (!id) { //catch falsy values like null or empty string
        return false;
    }
    let retVal = false;
    User.findById(id, (err, doc) => {
        if (!err && doc.role == "admin") {
            retVal = true;
        }
    });
    return retVal;
}

module.exports.currentUser = (tok) => {
    if (!tok) { //catch falsy values like null, empty string
        return null;
    }
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
    console.log(data);
    const requiredFields = ['email', 'password', 'confirm_password', 'name'];

    if (!hasAll(data, requiredFields)) return callback({reason: 'Required field missing'}, null);

    if (data.password !== data.confirm_password) return callback({reason: 'Passwords do not match'}, null);

    if (!isEmail.test(data.email)) {
        return callback({reason: 'Email is not a valid format'}, null);
    }
    if (!matchesComplexityRequirements(data.password)) {
        return callback({reason: "Password doesn't match complexity requirements"}, false);
    }
    // if (grades.indexOf(data.grade) == -1) {
    //     return callback({reason: "Grade is not valid"});
    // }
    // //TODO: constraint checks for race, school, leader_name
    // tmp = hasAll(data.emergency_contact, ["name", "phone", "relation"]);
    // if (tmp) {
    //     return callback({reason: "data.emergency_contact missing " + tmp + " property"}, false);
    // }
    // if (!isPhone.test(data.emergency_contact.phone)) {
    //     return callback({reason: "Invalid phone number"}, false);
    // }
    const hashedPassword = hash.genNew(data.password);
    User.create({
        email: data.email,
        password: hashedPassword,
        role: data.role || 'user',
        name: data.name
    }, (err, result) => {
        if (err) {
            return callback(err, null);
        }

        return callback(null, result);
    });
    // if (user.addNew(data)) {
    //     delete data.hash;
    //     return callback(null, data);
    // }
}
