class OrganizationController {

    constructor(configs, manager) {
        this.configs = configs;
        this.manager = manager;
    }

    getOrganization(req, res, next) {
        const name = req.params.name;
        const page = (req.query.page || 1) - 1;
        const pageSize = this.configs.pageSize;
        const skip = page * pageSize;

        this.manager.getOrganizationRelations(name, skip, pageSize).then((results) => {
            const rows = results[0];

            res.status(200).send(rows);
        }).catch(next);
    }

    createOrganizations(req, res, next) {
        const body = req.body;

        this.manager.createOrganizations(body).then((numResults) => {
            res.status(201).send(`Created ${numResults} relationships.`);
        }).catch(next);
    }
}

module.exports = OrganizationController;