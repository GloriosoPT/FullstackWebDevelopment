const passport = require('passport');

module.exports = (app) => {

    app.use('/login', passport.authenticate('oidc'));

    app.use('/authorization-code/callback',
        passport.authenticate('oidc', { failureRedirect: '/error' }),
        (req, res) => {
            res.redirect('/');
        }
    );

};