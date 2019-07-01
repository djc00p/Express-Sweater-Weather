var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();
const { darkSkyApi, googleApi } = require('../../../config.js');
var Forecast = require('../../../services');
pry = require('pryjs');


router.get('/', function(req, res, next){
  if (req.body.hasOwnProperty('api_key')){
    let forecast = new Forecast(req.query);
    let geoLocation = forecast.googleService();
    geoLocation.then(coords => {
      return forecast.darkskyService(coords.geometry.location);
    }).then( weather => {
      return forecast.weather(weather, forecast.formatLocation(req.query.location));
    }).then(forecast => {
      res.setHeader('Content-type','application/json');
      res.status(200).send(JSON.stringify(forecast))
    }).catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send(JSON.stringify({ message: error.errors[0].message }));
    });
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify({message: 'Unauthorized User'}));
  }
});

module.exports = router;
