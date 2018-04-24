const routes = require('next-routes')();

routes
    .add('/crowdfunds/new', '/crowdfunds/new')
    .add('/crowdfunds/:address', '/crowdfunds/view')
    .add('/crowdfunds/:address/requests', '/crowdfunds/requests/index')
    .add('/crowdfunds/:address/requests/new', 'crowdfunds/requests/new');

module.exports = routes;
