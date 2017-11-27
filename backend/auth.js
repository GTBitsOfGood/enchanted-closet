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

function isCorrectAuthHeaderFormat(header) {
    if (!header) return false;
    if (!header.startsWith('Bearer ')) return false;
    if (header.split(' ').length !== 2) return false;
    return true;
}

function getToken(headers) {
    if (!headers) return null;
    return headers[authHeader].split(' ')[1];
}

module.exports.hasValidToken = (req, res, next) => {
    let header = req.headers[authHeader];
    if (!header || !isCorrectAuthHeaderFormat(header)) {
        res.locals.error = authError;
        return next(new Error(res.locals.errors));
    }
    let token = header.split(' ')[1];
    redisClient.get(token, (err, cachedID) => {
        if (err) {
            res.locals.error = {
                code: 500,
                msg: 'Internal server error'
            };
            return next(new Error(res.locals.error));
        }

        if (!cachedID) {
            res.locals.error = authError;
            return next(new Error(res.locals.error));
        }

        console.log('valid')

        return next();
    });
}

module.exports.isAdmin = (req, res, next) => {
    let token = getToken(req.headers);
    redisClient.get(token, (err, cachedID) => {
        if (err) {
            res.locals.error = {
                code: 500,
                msg: 'Internal server error'
            };
            return next(new Error(res.locals.error));
        }

        User.findById(cachedID, (err, user) => {
            if (err || !user) {
                res.locals.error = authError;
                return next(new Error(res.locals.error));
            }

            if (user.role.toLowerCase() !== 'admin') {
                res.locals.error = authError;
                return next(new Error(res.locals.error));
            }

            return next();
        });
    });
}

module.exports.isAdminOrIDMatches = (req, res, next) => {
    let token = getToken(req.headers);
    redisClient.get(token, (err, cachedID) => {
        if (err) {
            res.locals.error = {
                code: 500,
                msg: 'Internal server error'
            };
            return next(new Error(res.locals.error));
        }

        User.findById(cachedID, (err, user) => {
            if (err || !user) {
                res.locals.error = authError;
                return next(new Error(res.locals.error));
            }

            if (user.role.toLowerCase() === 'admin') {
                return next();
            }

            if (req.params.id === user._id) {
                return next();
            }

            res.locals.error = authError;
            return next(new Error(res.locals.error));
        });
    });
}

module.exports.isIDMatch = (req, res, next) => {
    let token = getToken(req.headers);
    redisClient.get(token, (err, cachedID) => {
        if (err) {
            res.locals.error = {
                code: 500,
                msg: 'Internal server error'
            };
            return next(new Error(res.locals.error));
        }

        User.findById(cachedID, (err, user) => {
            if (err || !user) {
                res.locals.error = authError;
                return next(new Error(res.locals.error));
            }

            if (req.params.id === user._id) {
                return next();
            }

            res.locals.error = authError;
            return next(new Error(res.locals.error));
        });
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
