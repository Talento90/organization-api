const OrganizationController = require('./controller');
const OrganizationManager = require('./manager');


module.exports.init = function(server, configs, database) {
    const manager = new OrganizationManager(database);
    const controller = new OrganizationController(configs, manager);

    server.get('/api/organizations/:name', controller.getOrganization.bind(controller));
    server.post('/api/organizations', controller.createOrganizations.bind(controller));
}