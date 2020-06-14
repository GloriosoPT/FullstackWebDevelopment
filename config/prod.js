//prod.js - production keys here!!!
module.exports = {
    oktaBaseUrl: process.env.OKTA_BASE_URL,
    oktaClientID: process.env.OKTA_CLIENT_ID,
    oktaClientSecret: process.env.OKTA_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY,
    appBaseUrl: process.env.APP_BASE_URL
}