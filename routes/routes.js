const { restart } = require("nodemon");

module.exports = (app) => {

    function ensureLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login')
    }

    app.use('/profile', ensureLoggedIn, (req, res) => {
        res.send(req.user);
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(app.user);
    });

    app.get('/', (req, res) => {
        res.send({ hi: 'there' });
    });

    app.get('/error', (req, res) => {
        res.send('error', { res });
    });

};