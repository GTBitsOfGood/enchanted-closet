let hash = require('./hash');

const mongoose = require('mongoose');
const User = mongoose.model('User');
let randomBytes = require('crypto').randomBytes;
let redisClient = require('redis').createClient();

const authHeader = 'authorization';

const authError = {
    code: 403,
    msg: 'Invalid authorization credentials'
};

redisClient.on("error", function (err) {
    console.log("Error " + err);
});

module.exports.isAdmin = (id, callback) => {
    if (!id) { //catch falsy values like null or empty string
        callback(false);
        return next(new Error(res.locals.error));
    }
    let retVal = false;
    User.findById(id, (err, result) => {
        if (!err && result.role == "Admin") {
            callback(true);
            return next(new Error(res.locals.error));
        }
        callback(false);
    });
}

module.exports.currentUser = (tok, callback) => {
    if (!tok) { //catch falsy values like null, empty string
        return callback(null, null);
    }
    redisClient.get(tok, function(err, reply){
        callback(err, reply)
    });
}

module.exports.idMatchesOrAdmin = (req, res, next) => {
    let token = req.header("Authorization");
    if (!token.startsWith("Bearer ")) {
        res.locals.error = {
            status: 403,
            msg: 'Not authorized (must be admin)'
        };
        return next(new Error(res.locals.error));
    }
    token = token.substring(7);
    currentUser(token, (err, curr) => {
        if (err != null) {
            res.locals.error = {
                status: 403,
                msg: 'Not authorized or redis error'
            };
            return next(new Error(res.locals.error));
        }
        isAdmin(curr, (state) => {
            if (curr == null || (curr != req.id && !state)) {
                res.locals.error = {
                    status: 403,
                    msg: 'Not authorized'
                };
                return next(new Error(res.locals.error));
            }
            return next();
        });
    });
}

module.exports.checkAdmin = (req, res, next) => {
    let token = req.header("Authorization");
    if (!token.startsWith("Bearer ")) {
        res.locals.error = {
            status: 403,
            msg: 'Not authorized (must be admin)'
        };
        return next(new Error(res.locals.error));
    }
    token = token.substring(7);
    currentUser(token, (err, curr) => {
        if (err != null) {
            res.locals.error = {
                status: 403,
                msg: 'Not authorized or redis error'
            };
            return next(new Error(res.locals.error));
        }
        isAdmin(curr, (state) => {
            if (!state) {
                res.locals.error = {
                    status: 403,
                    msg: 'Not authorized (must be admin)'
                };
                return next(new Error(res.locals.error));
            }
            return next();
        });
    });
}

module.exports.idMatches = (req, res, next) => {
    if (!token.startsWith("Bearer ")) {
        res.locals.error = {
            status: 403,
            msg: 'Not authorized (must be admin)'
        };
        return next(new Error(res.locals.error));
    }
    token = token.substring(7);
    currentUser(token, (err, curr) => {
        if (err != null || curr == null || curr != req.id) {
            res.locals.error = {
                status: 403,
                msg: 'Not authorized'
            };
            return next(new Error(res.locals.error));
        }
        return next();
    });
}

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