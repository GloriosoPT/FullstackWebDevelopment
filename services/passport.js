const passport = require('passport');
const OktaStrategy = require('passport-openidconnect').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

/*passport.serializeUser((user, next) => {
    next(null, user);
});*/

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        }
    );
});

passport.use('oidc',
    new OktaStrategy(
        {
            issuer: keys.oktaBaseUrl + '/oauth2/default',
            authorizationURL: keys.oktaBaseUrl +'/oauth2/default/v1/authorize',
            tokenURL: keys.oktaBaseUrl + '/oauth2/default/v1/token',
            userInfoURL: keys.oktaBaseUrl + '/oauth2/default/v1/userinfo',
            clientID: keys.oktaClientID,
            clientSecret: keys.oktaClientSecret,
            callbackURL: '/authorization-code/callback',
            scope: 'openid profile email offline_access',
            proxy: true
        },
        (issuer, sub, profile, accessToken, refreshToken, done) => {
            console.log('issuer: ', issuer);
            console.log('sub: ', sub);
            console.log('profile: ', profile);
            console.log('accessToken: ', accessToken);
            console.log('refreshToken: ', refreshToken);

            User.findOne(
                {
                    oktaId: profile.id
                }
            ).then((existingUser) => 
                {
                    if(existingUser) {
                        //we already have a record with a given profileId
                        done(null, existingUser);
                    }
                    else {
                        //we dont have a user record with this Id, create a new record
                        new User(
                            {
                                oktaId: profile.id,
                                displayName: profile.displayName
                            }
                        )
                        .save()
                        .then(user => done(done, user));
                    }
                }
            );

            //return done(null, profile);
        }
    )
);