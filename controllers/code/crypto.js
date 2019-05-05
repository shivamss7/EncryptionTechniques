const fs = require('fs');
const crypto = require("./encryptionModule.js");
const parallel = require('run-parallel');

var password = "Shh-its-a-secret";

// fs.readFile("../file/encrypted/AES/output10mb.txt", function(err, data) {
// 	var data = data.toString();
// 	console.log("Decrypting file using AES");
// 	var aes = crypto.aesDecrypt(data, password);
// 	console.log("Decryption Done!");
// });


module.exports.crypt = function(req, res, data) {
	var data = data.toString();
	console.log("Encrypting file using AES");
	var aes = crypto.aesEncrypt("hello", password);
	console.log("Encryption Done!");
	return aes;
}

