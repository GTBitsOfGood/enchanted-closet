let hash = require('./hash');
let user = require('./controllers/users');
let randomBytes = require('crypto').randomBytes;
let redisClient = require('redis').createClient();
const User = require('mongoose').model('User');

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

module.exports.isAdmin = (id) => {
    if (!id) { //catch falsy values like null or empty string
        return false;
    }
    let retVal = false;
    User.findById(id, (err, doc) => {
        if (!err && doc.role == "Admin") {
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

module.exports.checkAdmin = (req, res, next) => {
    let token = req.header("Authorization");
    if (token && token.split(" ").length == 2) {
        token = token.split(" ")[1];
    }
    if (!auth.isAdmin(auth.currentUser(token))) {
        res.locals.error = {
            status: 403,
            msg: 'Not authorized (must be admin)'
        };
        //TODO: verify that this sends response
        return;
    }
    return next();
}

module.exports.idMatches = (req, res, next) => {
    let token = req.header("Authorization");
    if (token && token.split(" ").length == 2) {
        token = token.split(" ")[1];
    }
    let curr = currentUser(token);
    if (curr == null || curr != req.id) {
        //TODO: verify that this sends response
        res.locals.error = {
            status: 403,
            msg: 'Not authorized'
        };
        return;
    }
    return next();
}