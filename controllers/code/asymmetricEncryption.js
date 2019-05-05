const rsa = require('js-crypto-rsa');
const fs = require('fs');

// var file = JSON.parse(fs.readFileSync('output.json'));
// var msg = new TextEncoder("utf-8").encode('Hello how are you');
// var publicJwk = file.publicKey;
// var privateJwk = file.privateKey;
// // console.log(file);

// rsa.encrypt(
//   msg,
//   publicJwk,
//   'SHA-256', // optional, for OAEP. default is 'SHA-256'
//   // { // optional
//   //   name: 'RSA-PSS', // default. 'RSASSA-PKCS1-v1_5' is also available.
//   //   // label: new Uint8Array([...]) // optional
//   // }
//   ).then( (encrypted) => {
//   // now you get an encrypted message in Uint8Array
//   var obj = {data : encrypted};
//   fs.writeFileSync('encrypt.json', JSON.stringify(obj));
// });

module.exports.asymmetric = async function(req, res, key, msg) {
  var msg = new TextEncoder("utf-8").encode('Hello how are you');
  var encrypted = await rsa.encrypt(
                msg,
                key.public,
                'SHA-256', // optional, for OAEP. default is 'SHA-256'
                // { // optional
                //   name: 'RSA-PSS', // default. 'RSASSA-PKCS1-v1_5' is also available.
                //   // label: new Uint8Array([...]) // optional
                // }
                );
  return encrypted;
} 