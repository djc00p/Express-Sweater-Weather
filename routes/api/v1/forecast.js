const fetch = require('node-fetch')

class Forecast {
  constructor(forecast_params){
    this.forecast_params = forecast_params.location
  }
  location(){
    return this.forecast_params
  }
  
}
