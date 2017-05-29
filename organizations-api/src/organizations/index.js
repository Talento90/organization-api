const OrganizationController = require('./controller');
const OrganizationManager = require('./manager');


function asyncHandler(routeHandler) {
  return async function (req, res, next) {
    try {
      await routeHandler(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}

module.exports.init = function(server, configs, database) {
    const manager = new OrganizationManager(database);
    const controller = new OrganizationController(configs, manager);

    server.get('/api/organizations/:name', asyncHandler(controller.getOrganization.bind(controller)));
    server.post('/api/organizations', asyncHandler(controller.createOrganizations.bind(controller)));
}