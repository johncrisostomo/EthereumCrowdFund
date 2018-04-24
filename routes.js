const routes = require('next-routes')();

routes
    .add('/crowdfunds/new', '/crowdfunds/new')
    .add('/crowdfunds/:address', '/crowdfunds/view')
    .add('/crowdfunds/:address/requests', '/crowdfunds/requests/index');

module.exports = routes;
