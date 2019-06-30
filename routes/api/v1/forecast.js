var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();
const { darkSkyApi, googleApi } = require('../../../config/config');
pry = require('pryjs');

// console.log(`Your DARK_SKY_API is ${darkSkyApi}`);
// console.log(`Your GOOGLE_API is ${googleApi}`);
class Forecast {
  constructor(forecast_params){
    this.location = forecast_params.location
  }

  // _darkSkyService() {
  //     fetch(`https://api.darksky.net/forecast/${darkSkyApi}/${_googleService()},${}`)
  //   }

  googleService() {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${googleApi}&address=${this.location}`)
    .then(response => response.json())
    .then(locationInfo => {
      // eval(pry.it)
      // use darkSkyApi inside to avoid getting a promise
        _darkSkyService(locationInfo.results[0].geometry.location)
    })
    .catch(error => {
      {error}
    })
  }
}

router.get('/', function(req, res, next){
  if (req.body.hasOwnProperty('api_key')){
    let forecast = new Forecast(req.query);
    let location = forecast.googleService();
    eval(pry.it)

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
