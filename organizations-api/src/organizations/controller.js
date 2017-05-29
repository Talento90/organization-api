class OrganizationController {

    constructor(configs, manager) {
        this.configs = configs;
        this.manager = manager;
    }

    async getOrganization(req, res, next) {
        const name = req.params.name;
        const page = (req.query.page || 1) - 1;
        const pageSize = this.configs.pageSize;
        const skip = page * pageSize;

        let results = await this.manager.getOrganizationRelations(name, skip, pageSize);
        res.status(200).send(results[0]);
    }

    async createOrganizations(req, res, next) {
        const body = req.body;

        let numResults = await this.manager.createOrganizations(body)
        res.status(201).send(`Created ${numResults} relationships.`);
    }
}

module.exports = OrganizationController;