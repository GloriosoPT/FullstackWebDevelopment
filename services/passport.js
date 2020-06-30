const passport = require('passport');
const OktaStrategy = require('passport-openidconnect').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

/*passport.serializeUser((user, next) => {
    next(null, user);
});*/

passport.serializeUser((user, done) => {
    console.log("serializeUser");
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log("deserializeUser");
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use('oidc',
    new OktaStrategy(
        {
            issuer: keys.oktaBaseUrl + '/oauth2/default',
            authorizationURL: keys.oktaBaseUrl + '/oauth2/default/v1/authorize',
            tokenURL: keys.oktaBaseUrl + '/oauth2/default/v1/token',
            userInfoURL: keys.oktaBaseUrl + '/oauth2/default/v1/userinfo',
            clientID: keys.oktaClientID,
            clientSecret: keys.oktaClientSecret,
            callbackURL: '/authorization-code/callback',
            scope: 'openid profile email offline_access'
        },
        async (issuer, sub, profile, accessToken, refreshToken, done) => {
            console.log("TESSSSSSSSSSSSSSSSSSSSTTTTTTTTTTT");
            console.log('issuer: ', issuer);
            console.log('sub: ', sub);
            console.log('profile: ', profile);
            console.log('accessToken: ', accessToken);
            console.log('refreshToken: ', refreshToken);

            const existingUser = await User.findOne({ oktaId: profile.id });
            if (existingUser) {
                //we already have a record with a given profileId
                return done(null, existingUser);
            }
            
            //we dont have a user record with this Id, create a new record
            const user = await new User(
                {
                    oktaId: profile.id,
                    displayName: profile.displayName
                }
            ).save();
            done(null, user);
        }
    )
);