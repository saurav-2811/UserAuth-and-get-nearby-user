require('dotenv').config({path:'./config/config.env'})
module.exports={
    NODE_ENV:process.env.NODE_ENV,
    PORT:process.env.PORT,
    DB_URL:process.env.DB_URL,
    GEOCODER_PROVIDER:process.env.GEOCODER_PROVIDER,
    API_KEY:process.env.API_KEY,
}