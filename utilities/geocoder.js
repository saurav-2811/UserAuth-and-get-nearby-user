const dotenv= require('dotenv')
const {GEOCODER_PROVIDER,API_KEY}=require('../config/index')
const NodeGeocoder=require('node-geocoder');
const Geocoder = require('node-geocoder');
const options={
    provider:GEOCODER_PROVIDER,
    httpAdapter:'https',
    apiKey: API_KEY,
    formatter:null
};
const geocoder =NodeGeocoder(options);
module.exports=geocoder