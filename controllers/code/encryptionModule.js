const CryptoJS = require('crypto-js');

module.exports.aesEncrypt = function (msg, pass) {
	var keySize = 128;
	var ivSize = 128;
	var iterations = 10;

 	var salt = CryptoJS.lib.WordArray.random(128/8);
  
  	var key = CryptoJS.PBKDF2(pass, salt, {
      keySize: keySize/32,
      iterations: iterations
    });

  	var iv = CryptoJS.lib.WordArray.random(128/8);
  
 	var encrypted = CryptoJS.AES.encrypt(msg, key, { 
	    iv: iv, 
	    padding: CryptoJS.pad.Pkcs7,
	    mode: CryptoJS.mode.CBC
  	});
  
  // salt, iv will be hex 32 in length
  // append them to the ciphertext for use  in decryption
  	var transitmessage = salt.toString()+ iv.toString() + encrypted.toString();
  	return transitmessage.toString();
}

module.exports.aesDecrypt = function (transitmessage, pass) {
	var keySize = 128;
	var iterations = 10;

	var salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32));
	var iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32))
	var encrypted = transitmessage.substring(64);
	  
	var key = CryptoJS.PBKDF2(pass, salt, {
	    keySize: keySize/32,
	    iterations: iterations
	});

	var decrypted = CryptoJS.AES.decrypt(encrypted, key, { 
	    iv: iv, 
	    padding: CryptoJS.pad.Pkcs7,
	    mode: CryptoJS.mode.CBC
	    
	})
	return decrypted.toString(CryptoJS.enc.Utf8);
}

module.exports.desEncrypt = function (message, pass) {
	var keyHex = CryptoJS.enc.Utf8.parse(pass);
    
    var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
   return encrypted.toString();
}

module.exports.desDecrypt = function (msg, pass) {
	var keyHex = CryptoJS.enc.Utf8.parse(pass);

    var decrypted = CryptoJS.DES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(msg)
    }, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
	return decrypted.toString(CryptoJS.enc.Utf8);
}

module.exports.rc4Encrypt = function (message, pass) {
	var keyHex = CryptoJS.enc.Utf8.parse(pass);
    
    var encrypted = CryptoJS.RC4Drop.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
   return encrypted.toString();
}

module.exports.rc4Decrypt = function (msg, pass) {
	var keyHex = CryptoJS.enc.Utf8.parse(pass);

    var decrypted = CryptoJS.RC4Drop.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(msg)
    }, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
	return decrypted.toString(CryptoJS.enc.Utf8);
}