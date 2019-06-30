var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();
const { darkSkyApi, googleApi } = require('../../../config/config');
pry = require('pryjs');

class Forecast {
  constructor(forecast_params){
    this.location = forecast_params.location
  }

  weather(weather, req) {
    let output = {
      'location': req.query.location.toUppercase(),
      'currently': weather.currently,
      'hourly': weather.hourly,
      'daily': weather.daily
    }
    return output
  }

  googleService() {
    const fetchPromise = fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${googleApi}&address=${this.location}`)
    .then(response => {return response.json();
    })
    .then(locationInfo => {
      return  locationInfo.results[0].geometry.location
    })
    .catch(error => {
      {error}
    })
    return fetchPromise
  }

  darkskyService(coords) {
    return fetch(`https://api.darksky.net/forecast/${darkSkyApi}/${coords.lat},${coords.lng}?exclude=minutely,alerts,flags`)
    .then( response => response.json())
    .then( weatherInfo => {
      return weatherInfo
    })
    .catch(error => {
      {error}
    })
  }
}

router.get('/', function(req, res, next){
  if (req.body.hasOwnProperty('api_key')){
    let forecast = new Forecast(req.query);
    let geoLocation = forecast.googleService();
    geoLocation.then(coords => {
      return forecast.darkskyService(coords);
    }).then( weather => {
      res.setHeader('Content-type','application/json');
      res.status(200).send(JSON.stringify(weather))
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

// const fetch = require('node-fetch');
// const dotenv = require('dotenv');
// dotenv.config();
// const { darkSkyApi, googleApi } = require('../config/config');
// var location = 'denver,co'


// module.exports = googleService(location);

// {
// 	"api_key": "0.lc4ksh9swh"
// }
