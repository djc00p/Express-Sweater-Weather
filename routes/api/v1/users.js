var express = require('express');
var router = express.Router();
var User = require('../../../models').User;
const bcrypt = require('bcrypt');
const saltRounds = 10;
pry = require('pryjs');

// POST New User
router.post('/', function(req, res, next) {
  var hashedPassword = bcrypt.hashSync(`${req.body.password}`, saltRounds);
    if (bcrypt.compareSync(`${req.body.password_confirmation}`, hashedPassword)){
    User.create(
      {
      email: req.body.email,
      password: hashedPassword,
      apiKey: Math.random().toString(36)
    })
    .then(user => {
      res.setHeader('Content-type','application/json');
      res.status(201).send(JSON.stringify({ "api_key": user.apiKey }))

    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      if (res.status(500)) {
        res.status(401).send(JSON.stringify({ message: error.errors[0].message }));
      }
    });
  }
});

module.exports = router;
