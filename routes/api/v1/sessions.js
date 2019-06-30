var express = require('express');
var router = express.Router();
var User = require('../../../models').User;
const bcrypt = require('bcrypt');
pry = require('pryjs');

// GET Exisiting User

router.post('/', function(req, res, next) {
	User.findAll({
		where: {
			email: req.body.email
		}
	})
	.then(user => {
		if (bcrypt.compareSync(req.body.password, user[0].password)) {
			res.setHeader('Content-type','application/json');
			res.status(200).send(JSON.stringify({ "api_key": user[0].apiKey }))
		}
	})
	.catch(error => {
		res.setHeader("Content-Type", "application/json");
		res.status(501).send(JSON.stringify({ message: error.errors[0].message }));
	});
});


module.exports = router;
