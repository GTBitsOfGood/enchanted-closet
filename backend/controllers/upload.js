"use strict";

const AWS = require('aws-sdk');
let s3 = new AWS.S3();
const crypto = require('crypto');

module.exports.userPic = (req, res, next) => {
    //TODO: remove old pic
    
}

module.exports.eventPic = (req, res, next) => {

}

function upload(req, bucketName, callback) {
    let id = crypto.randomBytes(15).toString('hex'); //30 character hex string
    let params = {
        ACL: "public-read",
        Body: req.file,
        Bucket: bucketName,
        Key: id
    }
    s3.putObject(params, (err, data) => {
        if (callback) {
            callback(err);
        }
    });
}