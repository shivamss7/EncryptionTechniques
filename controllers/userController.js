const mongoose = require('mongoose');
const User = mongoose.model('Storage');

var E = 'Encryption Techniques', H = 'Hybrid Encryption', S = 'yess'

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {
	console.log(req.body);
	User.create({
    author: req.body.user,
    password: req.body.pwd,
  }, function(err, data) {
    if (err) {
      console.log(err);
      res.render('register', { title: E, heading: 'Registration Form', message: 'Registration Failed', color: 'red'});
    } else {
      console.log(data);
      res.render('register', { title: E, heading: 'Registration Form', message: 'Registration Sucessfully Done', color: 'green'});
    }
  });
}

module.exports.login = function(req, res) {
  
  if(req.body.user == null || req.body.pwd == null)
    res.render('login', { title: E, heading: E, error : "Please enter both fields"});

  User
  .find({ author: req.body.user})
  .exec(
        function(err, data) { //console.log( data);
          if(!data.length) {
            res.render('login', { title: E, heading: E, error : "No such User"});
          }
          else if (err) {
            console.log(err);
            res.render('login', { title: E, heading: E, error : "Error in the process"});
          }
          else {
            req.session.user = req.body.user;
            res.render('index', { title: E, heading: E, session: S})
          }
        }
    );
} 