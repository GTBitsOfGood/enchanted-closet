"use strict";

const AWS = require('aws-sdk');
let s3 = new AWS.S3();
const crypto = require('crypto');
const User = require('mongoose').model('User');
const Event = require('mongoose').model('Event');
const BUCKET_NAME = "bucket";

module.exports.userPic = (req, res, next) => {
    if (!req.params.id) {
        res.locals.error = {
            status: 400,
            msg: "User ID required"
        }
        return next(new Error(res.locals.error));
    }
    if (!req.file) {
        res.locals.error = {
            status: 400,
            msg: "Picture required"
        }
        return next(new Error(res.locals.error));
    }
    User.findById(req.params.id, (err, doc) => {
        if (err) {
            res.locals.error = {
                status: 500,
                msg: "User ID required"
            }
            return next(new Error(res.locals.error));
        }
        replacePhoto(doc, BUCKET_NAME, req, res, next);
    });
}

function replacePhoto(doc, bucketName, req, res, next) {
    if (doc.photo) {
        s3.deleteObject({Bucket: bucketName, key: doc.photo}, (err, data) => {
            if (err) {
                res.locals.error = {
                    status: 500,
                    msg: "Unable to delete old photo"
                };
                return next(new Error(res.locals.error));
            }
            upload(req.file, bucketName, (err, newID) => {
                if (err) {
                    res.locals.error = {
                        status: 500,
                        msg: "Unable to add new photo"
                    };
                    return next(new Error(res.locals.error));
                }
                doc.photo = newID;
                doc.save((err, data) => {
                    if (err) {
                        res.locals.error = {
                            status: 500,
                            msg: "Unable to save document"
                        };
                        return next(new Error(res.locals.error));
                    }
                    return next();
                })
            });
        });
    }
}

module.exports.eventPic = (req, res, next) => {
    if (!req.params.id) {
        req.locals.error = {
            status: 400,
            msg: "Event ID required"
        }
        return next(new Error(req.params.error));
    }
    if (!req.file) {
        res.locals.error = {
            status: 400,
            msg: "Picture required"
        }
        return next(new Error(res.locals.error));
    }
    Event.findById(req.params.id, (err, doc) => {
        if (err) {
            res.locals.error = {
                status: 500,
                msg: "User ID required"
            }
            return next(new Error(res.locals.error));
        }
        replacePhoto(doc, BUCKET_NAME, req, res, next);
    });
}

function upload(file, bucketName, callback) {
    let id = crypto.randomBytes(15).toString('hex'); //30 character hex string
    let params = {
        ACL: "public-read",
        Body: file,
        Bucket: bucketName,
        Key: id
    }
    s3.putObject(params, (err, data) => {
        if (callback) {
            callback(err, id);
        }
    });
}