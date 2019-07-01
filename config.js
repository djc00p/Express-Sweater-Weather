const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  darkSkyApi: process.env.DARK_SKY_API,
  googleApi: process.env.GOOGLE_API
};
