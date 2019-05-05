const fs = require('fs');
const crypto = require("./encryptionModule.js");
var series = require('run-series');

var password = "Shh-its-a-secret";

//fs.writeFileSync("../file/encrypted/layered/outputabc.txt", rc4);

module.exports.layered = function(req, res) {
	var file = req.body.data;
	console.log("DES");
	var des = crypto.desEncrypt(file, password);

	console.log("AES");
	var aes = crypto.aesEncrypt(des, password);

	console.log("RC4");
	var rc4 = crypto.rc4Encrypt(aes, password);

	return rc4;
}
