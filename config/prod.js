//prod.js - production keys here!!!
module.exports = {
    oktaClientID: process.env.OKTA_CLIENT_ID,
    oktaClientSecret: process.env.OKTA_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY
}