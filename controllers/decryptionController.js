const hybrid = require('./code/decryption');
const layered = require('./code/layeredDecryption');
const asymmetric = require('./code/asymmetricDecryption');
const path = require('path');
const splitFile = require('split-file');
const fs = require('fs');
var mongoose = require('mongoose');
var User = mongoose.model('Storage');

var E = 'Encryption Techniques', H = 'Hybrid Encryption', L = 'Layered Encryption', S = 'yess'
	D ='Decryption', Hd = 'Hybrid Decryption', Ld = 'Layered Decryption';

module.exports.main = function(req, res) {
	var user = req.session.user;
	User
	.findOne({author: req.session.user})
	.exec(
		  function(err, data) {
		  	res.render('decrypt', { title: D, heading: D, session: S, document: data});
		  });
}

module.exports.hybrid = function(req, res) {
	var i = parseInt(req.query.count) - 1;
	User
	.findOne({author: req.session.user})
	.select('data.hybrid')
	.exec(
		  async function(err, data) {
		  	enc = data.data.hybrid[i];
		  	var result = await hybrid.hybrid(req, res, enc);
		  	console.log(res.url);
		  	res.render('decrypted', { title: D, heading: Hd, session: S, document: result });
	      });
}

module.exports.layered = function(req, res) {
	var i = parseInt(req.query.count) - 1;
	User
	.findOne({author: req.session.user})
	.select('data.layered')
	.exec(
		  async function(err, data) {
		  	enc = data.data.layered[i];
		  	var result = await layered.layered(req, res, enc); 
		  	res.render('decrypted', { title: D, heading: Ld, session: S, document: result });
	      });
}

module.exports.asymmetric = function(req, res) {
	var i = parseInt(req.query.count) - 1;
	User
	.findOne({author: req.session.user})
	.select('data.asymmetric data.keys')
	.exec(
		  async function(err, data) {
		  	var key = data.data.keys;
		  	enc = data.data.asymmetric[i];
		  	var result = await asymmetric.asymmetric(req, res, enc, key); 
		  	res.render('decrypted', { title: D, heading: Ld, session: S, document: result });
	      });
}