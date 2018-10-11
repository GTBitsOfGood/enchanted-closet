'use strict'
import * as path from 'path'

module.exports.index = (req, res) => {
  return res.sendFile(path.join(__dirname, '/public/index.html'))
}
