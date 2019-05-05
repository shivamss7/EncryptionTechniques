var express = require('express');
var router = express.Router();
var encrypt = require('../controllers/encryptionController');
var decrypt = require('../controllers/decryptionController');
var user = require('../controllers/userController');

var E = 'Encryption Techniques', H = 'Hybrid Encryption', L = 'Layered Encryption',
	A = 'Asymmetric Encryption', S = 'yess';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: E, heading: E });
});


/*login and register */
router.get('/logout', function(req, res) {
	req.session.destroy(function(err) {
		res.render('login', { title: E, heading: E});
	})
});
router.post('/login', user.login);


router.get('/register', function(req, res) {
	res.render('register', { title: E, heading: 'Registration Form'});
});
router.post('/register', user.register);


/* encryption */
router.get('/encrypt', function(req, res){
	res.render('encrypt', { title: E, heading: E, session: S});
});


router.get('/hybrid', function(req, res) {
	res.render('hybrid', { title: H, heading: H, session: S});
});
router.post('/submitHybrid', encrypt.encryptHybrid);
router.post('/saveHybrid', encrypt.saveHybrid);


router.get('/layered', function(req, res) {
	res.render('layered', { title: L, heading: L, session: S});
});
router.post('/submitLayered', encrypt.encryptLayered);
router.post('/saveLayered', encrypt.saveLayered);


router.get('/asymmetric', function(req, res) {
	res.render('asymmetric', { title: A, heading: A, session: S});
});
router.get('/generateKeys', encrypt.generateKeys);
router.post('/submitAsymmetric', encrypt.encryptAsymmetric);
router.post('/saveAsymmetric', encrypt.saveAsymmetric);
/* Decryption */

router.get('/decrypt', decrypt.main);

router.get('/decryptHybrid', decrypt.hybrid);

router.get('/decryptLayered', decrypt.layered);

router.get('/decryptAsymmetric', decrypt.asymmetric);

module.exports = router;
