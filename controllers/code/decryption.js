const fs = require('fs');
const crypto = require("./encryptionModule.js");
const parallel = require('run-parallel');

var output;
var password = "Shh-its-a-secret";


module.exports.hybrid = async function(req, res, file) {

	var files = file.split(",");
	console.log("Decrypting using Hybrid Algorithm");

	var data;
	await parallel([
		function(callback) {
			let aes = crypto.aesDecrypt(files[0], password);
			callback(null, aes);
		},
		function(callback) {
			let rc4 = crypto.rc4Decrypt(files[1], password);
			callback(null, rc4);
		},
		function(callback) {
			let des = crypto.desDecrypt(files[2], password);
			callback(null, des);
		}
	],
	function(err, result) {
		data = result.join('');
		console.log("Decryption Done!");
	});
	return data;
}

