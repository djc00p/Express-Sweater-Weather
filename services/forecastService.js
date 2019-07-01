const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();
const { darkSkyApi, googleApi } = require('../config.js');
pry = require('pryjs');
class Forecast {
  constructor(forecast_params){
    this.location = forecast_params.location
  }

  weather(weather, reqLocation) {
    let output = {
      'location': reqLocation,
      'currently': weather.currently,
      'hourly': weather.hourly,
      'daily': weather.daily
    }
    return output
  }

  currentWeather(weather, reqLocation) {
    let output = {
      'location': reqLocation,
      'currently': weather.currently,
    }
    return output
  }

  formatLocation(cityState) {
    let cityUp = cityState.split(',')[0].charAt(0).toUpperCase() + cityState.split(',')[0].slice(1)
    let stateUp = cityState.split(',')[1].toUpperCase()
    return cityUp + ', ' + stateUp
  }
  googleService() {
    const fetchPromise = fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${googleApi}&address=${this.location}`)
    .then(response => {return response.json();
    })
    .then(locationInfo => {
      return  locationInfo.results[0]
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

module.exports = Forecast;
