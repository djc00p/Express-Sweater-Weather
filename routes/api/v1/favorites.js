var express = require('express');
var router = express.Router();
var User = require('../../../models').User;
var FavoriteCities = require('../../../models').FavoriteCities;
const bcrypt = require('bcrypt');
const saltRounds = 10;
pry = require('pryjs');

var findUser = function(apiKey) {
  return User.findAll({
    where: {
      'apiKey': apiKey
    },
  })
}

// POST New favorite city
router.post('/', function(req, res, next) {
  if (req.body.hasOwnProperty('api_key')){
    findUser(req.body.api_key)
    .then(user => {
      FavoriteCities.findOrCreate({
        where: {
          location: req.body.location
        }
      }).then(favoriteCity => {
        favoriteCity[0].update({'UserId': user[0].id})
        .then(favorite => {
          res.setHeader('Content-type','application/json');
          res.status(201).send(JSON.stringify({ message: `${favorite.location} has been added to your favorites` }))
      })
    })
  })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(501).send(JSON.stringify({ message: error.errors[0].message }));
    });
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify({message: 'Unauthorized User'}));
  }
});

module.exports = router;
