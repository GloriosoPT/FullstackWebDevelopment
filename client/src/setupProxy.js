const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    ['/api/*','/login'],
    createProxyMiddleware({
      target: 'http://localhost:5000'
    })
  );
};