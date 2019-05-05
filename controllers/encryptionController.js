const hybrid = require('./code/hybrid');
const layered = require('./code/layeredEncryption');
const asymmetric = require('./code/asymmetricEncryption');
const path = require('path');
const splitFile = require('split-file');
const fs = require('fs');
const rsa = require('js-crypto-rsa');

var mongoose = require('mongoose');
var User = mongoose.model('Storage');


var E = 'Encryption Techniques', H = 'Hybrid Encryption', L = 'Layered Encryption',
    A = 'Asymmetric Encryption', S = 'yess';

function split(size) {
	 splitFile.splitFile(path.join(__dirname, 'files/data.txt'), size)
	  .then((names) => {
	  // console.log(names);
	  })
	  .catch((err) => {
	    console.log('Error: ', err);
	  });
}


module.exports.encryptHybrid = async function(req, res) {
	console.log(req.body.data);
	var data = req.body.data;
	fs.writeFileSync(path.join(__dirname, 'files/data.txt'), data);
	split(3);
	var enc = await hybrid.hybrid(req, res);
	console.log(enc);
	res.render('hybrid', { title: H, heading: H, data: data, data2: enc, session: S});
}

module.exports.saveHybrid = function(req, res) {
	if(!req.body.data2)
		console.log("no data to be saved");
	console.log(req.session.user);
	User
	.findOne({ author: req.session.user})
	.exec(
      function(err, data) {
        if (!data) {
          console.log('no data');
        } 
        else if (err) {
          console.log('err');
        }
        else {
          if(data.data.hybrid) { console.log('qwerty');
            data.data.hybrid.push(req.body.data2);
          }
          else {
            data.data = {
              hybrid: req.body.data2
            };
          }
          console.log(typeof data);
          data.save(function(err, data) {
            if (err) {
              res.render('hybrid', { title: H, heading: H, session: S, message: 'Data Not Saved Successfully'});
            } else {
             res.render('hybrid', { title: H, heading: H, session: S, message: 'Data Saved Successfully'});
            }
          });
        }
      }
  );
}

module.exports.encryptLayered = function(req, res) {
	console.log(req.body.data);
	var data = req.body.data;
	var enc = layered.layered(req, res);
	console.log(enc);
	res.render('layered', { title: L, heading: L, data: data, data2: enc, session: S});
}

module.exports.saveLayered = function(req, res) {
	if(!req.body.data2)
		console.log("no data to be saved");
	User
	.findOne({ author: req.session.user})
	.exec(
      function(err, data) {
        if (!data) {
        	console.log('no data');
        } 
        else if (err) {
        }
        if(data.data.layered) {
        	data.data.layered.push(req.body.data2);
        }
        else {
	        data.data = {
		      layered: req.body.data2
		    };
		}
        console.log(typeof data);
        data.save(function(err, data) {
          if (err) {
            res.render('layered', { title: L, heading: L, session: S, message: 'Data Not Saved Successfully'});
          } else {
           res.render('layered', { title: L, heading: L, session: S, message: 'Data Saved Successfully'});
          }
        });
      }
  );
}

module.exports.generateKeys = function(req, res) {
  rsa.generateKey(2048).then( (key) => {
  // now you get the JWK public and private keys
  User
  .findOne({ author: req.session.user})
  .exec(
        function(rr, data) {
          if(!data)
            console.log("No data");
          if(data.data.keys.public)
            res.render('asymmetric', { title: A, heading: A, session: S, message: 'Key Already Generated'});
          data.data.keys.public = key.publicKey;
          data.data.keys.private = key.privateKey;
          data.save(function(err, data) {
            if (err) {
              res.render('asymmetric', { title: A, heading: A, session: S, message: 'Key not saved'});
            } else {
             res.render('asymmetric', { title: A, heading: A, session: S, message: 'Key Saved Successfully'});
            }
          })
        })
  });
}

module.exports.encryptAsymmetric = function(req, res) {
  console.log(req.body.data);
  var message = req.body.data;
  User
  .findOne({ author: req.session.user})
  .exec(
        async function(err, data) {
          if(err)
            console.log('error');
          if(!data)
            console.log('no data');
          if(!data.data.keys.public || !data.data.keys.public)
            res.render('asymmetric', { title: A, heading: A, session: S, message: 'Generate Key First'});
          var key = data.data.keys;
          var enc = await asymmetric.asymmetric(req, res, key, message);
          console.log(enc);
          res.render('asymmetric', { title: A, heading: A, data: message, data2: enc, session: S});
        });
}

module.exports.saveAsymmetric = function(req, res) {
  if(!req.body.data2)
    console.log("no data to be saved");
  User
  .findOne({ author: req.session.user})
  .exec(
      function(err, data) {
        if (!data) {
          console.log('no data');
        } 
        else if (err) {
        }
        if(data.data.asymmetric) {
          data.data.asymmetric.push(req.body.data2);
        }
        else {
          data.data = {
          asymmetric: req.body.data2
        };
    }
        console.log(typeof data);
        data.save(function(err, data) {
          if (err) {
            res.render('asymmetric', { title: A, heading: A, session: S, message: 'Data Not Saved Successfully'});
          } else {
           res.render('asymmetric', { title: A, heading: A, session: S, message: 'Data Saved Successfully'});
          }
        });
      }
  );
}
