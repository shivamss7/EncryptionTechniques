const fs = require('fs');
const crypto = require("./encryptionModule.js");
const parallel = require('run-parallel');
const path = require('path');

var output;
var password = "Shh-its-a-secret";

module.exports.hybrid = async function(req, res) {
	var one = fs.readFileSync(path.join(__dirname, '../files/data.txt.sf-part1')).toString();
	var two = fs.readFileSync(path.join(__dirname, '../files/data.txt.sf-part2')).toString();
	var three = fs.readFileSync(path.join(__dirname, '../files/data.txt.sf-part3')).toString();
	console.log("Encrypting using Hybrid Algorithm");

	var data;
	await parallel([
		function(callback) {
			let aes = crypto.aesEncrypt(one, password);
			callback(null, aes);
		},
		function(callback) {
			let rc4 = crypto.rc4Encrypt(two, password);
			callback(null, rc4);
		},
		function(callback) {
			let des = crypto.desEncrypt(three, password);
			callback(null, des);
		}
	],
	function(err, result) {
		console.log("Encryption Done!");
		data = result;
		//fs.writeFileSync("../file/encrypted/Hybrid/output30mb.txt", result.join("."));
	});
	return data;
}



