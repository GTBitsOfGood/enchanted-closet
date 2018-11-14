const fs = require('fs')
const readline = require('readline')
const { google } = require('googleapis')

// If modifying these scopes, delete token.json.
var SCOPES = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.send'
]
const TOKEN_PATH = 'token.json'
// move token to database!!!
// Should be getting and updating token in database!!!!!!

// Load client secrets from a local file.
module.exports.authSend = function authSend(receivers, subject, message) {
  // Authorize a client with credentials, then call the Gmail API.
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err)
    // Authorize a client with credentials, then call the Gmail API.
    authorize(JSON.parse(content), receivers, subject, message, sendMessage)
  })
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, receivers, subject, message, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback)
    oAuth2Client.setCredentials(JSON.parse(token))
    callback(oAuth2Client, receivers, subject, message)
  })
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  })
  console.log('Authorize this app by visiting this url:', authUrl)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close()
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err)
      oAuth2Client.setCredentials(token)
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err)
        console.log('Token stored to', TOKEN_PATH)
      })
      callback(oAuth2Client)
    })
  })
}

function makeBody(to, from, subject, message) {
  const email =
    "From: " + 'enchanted.closet.atlanta.help@gmail.com' + "\n\n" +
    "to: " + from.toString() + "\n" +
    "from: " + from + "\n" +
    "subject: " + subject + "\n\n" +
    message
  const encodedMail = Buffer.from(email).toString('base64')
  return encodedMail
}

function sendMessage(auth, receivers, subject, message) {
  console.log(receivers.toString())
  var raw = makeBody(receivers.toString(), 'enchanted.closet.atlanta.help@gmail.com', subject, message)
  const gmail = google.gmail({ version: 'v1', auth })
  gmail.users.messages.send({
    auth: auth,
    userId: 'enchanted.closet.atlanta.help@gmail.com',
    resource: {
      raw: raw
    }
  }, function(err, response) {
    if (err) {
      console.error(err)
    }
  })
}
