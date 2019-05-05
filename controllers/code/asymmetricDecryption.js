const rsa = require('js-crypto-rsa');
const fs = require('fs');

// var file = JSON.parse(fs.readFileSync('output.json'));
// var msg = new TextEncoder("utf-8").encode('Hello how are you');
// var publicJwk = file.publicKey;
// var privateJwk = file.privateKey;

// var obj = JSON.parse(fs.readFileSync('encrypt.json'));
// var values = Object.values(obj.data);
// var encrypted = new Uint8Array(values);
// // console.log(encrypted);
// rsa.decrypt(
//       encrypted,
//       privateJwk,
//       'SHA-256', // optional, for OAEP. default is 'SHA-256'
//       // { // optional
//       //   name: 'RSA-PSS', // default. 'RSASSA-PKCS1-v1_5' is also available.
//       //   // label: new Uint8Array([...]) // optional
//       // }
//     )  
// .then( (decrypted) => {
//   // now you get the decrypted message
//   console.log(new TextDecoder('utf-8').decode(decrypted));
// });

module.exports.asymmetric = async function(req, res, enc, key) {
  var encrypted = new Uint8Array(enc.split(','));
  var decrypted = await rsa.decrypt(
      encrypted,
      key.private,
      'SHA-256', // optional, for OAEP. default is 'SHA-256'
      // { // optional
      //   name: 'RSA-PSS', // default. 'RSASSA-PKCS1-v1_5' is also available.
      //   // label: new Uint8Array([...]) // optional
      // }
    );
  return new TextDecoder('utf-8').decode(decrypted);
}