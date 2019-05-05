const fs = require('fs');
const crypto = require("./encryptionModule.js");
var series = require('run-series');

var password = "Shh-its-a-secret";

module.exports.layered = function(req, res, file) {

	console.log("RC4");
	var rc4 = crypto.rc4Decrypt(file, password);

	console.log("AES");
	var aes = crypto.aesDecrypt(rc4, password);

	console.log("DES");
	var des = crypto.desDecrypt(aes, password);
	
	return des;
}