var express = require('express');
var router = express.Router();
var User = require('../../../models').User;
var FavoriteCities = require('../../../models').FavoriteCities;
var Forecast = require('../../../services');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();
const { darkSkyApi, googleApi } = require('../../../config.js');
pry = require('pryjs');

var findUser = function(apiKey) {
  return User.findAll({
    where: {
      'apiKey': apiKey
    },
  })
}
var findFavorites = function(userId) {
  return FavoriteCities.findAll({
    where: {
      'UserId': userId
    },
  })
}

var findFavoriteCitiesWeather = function(favcities) {
  let fav = favcities.map(function(element) {
    let formatedLocation = formatLocation(element);
    let forecast = new Forecast({location: formatedLocation});
    return forecast.googleService()
    .then(coords => {
      return forecast.darkskyService(coords.geometry.location);
    })
    .then( weather => {
      return forecast.currentWeather(weather, element.location);
    }).then(forecast => {
      return forecast
    })
  })
  return fav
}

var formatLocation = function(element) {
  return element.location.toLowerCase().replace(/\s+/g, '');
}
let favoriteCities = [{location: "Irvine, CA"}, {location: 'Denver, CO'}]


// GET favorite cities
router.get('/', function(req, res, next) {
  if (req.body.hasOwnProperty('api_key')){
    findUser(req.body.api_key)
    .then(user => {
      findFavorites(user[0].id)
      .then(favoriteCities => {
        Promise.all(findFavoriteCitiesWeather(favoriteCities))
        .then(favorite => {
          res.setHeader('Content-type','application/json');
          res.status(201).send(JSON.stringify(favorite))
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
