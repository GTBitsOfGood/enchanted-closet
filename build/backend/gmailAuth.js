"use strict";

const fs = require('fs');

const readline = require('readline');

const {
  google
} = require('googleapis'); // If modifying these scopes, delete token.json.


var SCOPES = ['https://mail.google.com/', 'https://www.googleapis.com/auth/gmail.modify', 'https://www.googleapis.com/auth/gmail.compose', 'https://www.googleapis.com/auth/gmail.send'];
const TOKEN_PATH = 'token.json'; // move token to database!!!
// Should be getting and updating token in database!!!!!!
// Load client secrets from a local file.

module.exports.authSend = function authSend(receivers, subject, message, callback) {
  // Authorize a client with credentials, then call the Gmail API.
  fs.readFile('credentials.json', (err, content) => {
    if (err) {
      return callback(err);
    } // Authorize a client with credentials, then call the Gmail API.


    authorize(JSON.parse(content), receivers, subject, message, callback);
  });
};
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 */


function authorize(credentials, receivers, subject, message, callback) {
  const {
    client_secret,
    client_id,
    redirect_uris
  } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]); // Check if we have previously stored a token.

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) {
      return getNewToken(oAuth2Client, callback);
    }

    oAuth2Client.setCredentials(JSON.parse(token));
    sendMessage(oAuth2Client, receivers, subject, message, callback);
  });
}
/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 */


function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', code => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        return callback(err);
      }

      oAuth2Client.setCredentials(token); // Store the token to disk for later program executions

      fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
        if (err) {
          return callback(err);
        }

        console.log('Token stored to', TOKEN_PATH);
      });
      sendMessage(oAuth2Client, callback);
    });
  });
}

function makeBody(to, from, subject, message) {
  const email = "to: " + to.toString() + "\n" + "from: " + from + "\n" + "subject: " + subject + "\n\n" + message;
  const encodedMail = Buffer.from(email).toString('base64');
  return encodedMail;
}

function sendMessage(auth, receivers, subject, message, callback) {
  var raw = makeBody(receivers.toString(), 'enchanted.closet.atlanta.help@gmail.com', subject, message);
  const gmail = google.gmail({
    version: 'v1',
    auth
  });
  gmail.users.messages.send({
    auth: auth,
    userId: 'enchanted.closet.atlanta.help@gmail.com',
    resource: {
      raw: raw
    }
  }, function (err, response) {
    if (err) {
      return callback(err);
    }

    return callback(null, response);
  });
}