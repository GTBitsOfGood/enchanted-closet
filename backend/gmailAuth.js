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
  authorize(receivers, subject, message, sendMessage)
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(receivers, subject, message, callback) {
  const CLIENT_ID = process.env.CLIENT_ID
  const CLIENT_SECRET = process.env.CLIENT_SECRET
  const REDIRECT_URIS = process.env.REDIRECT_URIS
  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID, CLIENT_SECRET, REDIRECT_URIS[0])

  // Check if we have previously stored a token.
  if (!process.env.ACCESS_TOKEN &&
    !process.env.REFRESH_TOKEN &&
    !process.env.SCOPE &&
    !process.env.TOKEN_TYPE &&
    !process.env.EXPIRY_DATE) {
    return getNewToken(oAuth2Client, callback)
  }
  oAuth2Client.setCredentials({ access_token: process.env.ACCESS_TOKEN,
    refresh_token: process.env.REFRESH_TOKEN,
    scope: process.env.SCOPE,
    token_type: process.env.TOKEN_TYPE,
    expiry_date: process.env.EXPIRY_DATE
  })
  callback(oAuth2Client, receivers, subject, message)
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
  var str = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
    "MIME-Version: 1.0\n",
    "Content-Transfer-Encoding: 7bit\n",
    "to: ", to,"\n",
    "from: ", from, "\n",
    "subject: ", subject, "\n\n",
    message
  ].join('')
  var encodedMail = Buffer.from(str.trim()).toString('base64').replace(/\+/g, '-').replace(/\//g, '_')
  return encodedMail
}

function sendMessage(auth, receivers, subject, message) {
  var raw = makeBody(receivers, 'testmailec1234@gmail.com', subject, message)
  const gmail = google.gmail({ version: 'v1', auth })
  gmail.users.messages.send({
    auth: auth,
    userId: 'testmailec1234@gmail.com',
    resource: {
      raw: raw
    }
  }, function(err, response) {
    if (err) {
      console.error(err)
    }
  })
}
