"use strict";

module.exports.index = (req, res) => {
	return res.sendFile(__dirname + '/public/index.html');
}