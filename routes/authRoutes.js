const passport = require('passport');

module.exports = (app) => {

    app.get('/login', passport.authenticate('oidc'));

    app.get('/authorization-code/callback',
        passport.authenticate('oidc'),
        (req, res) => {
            res.redirect('/surveys');
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

};