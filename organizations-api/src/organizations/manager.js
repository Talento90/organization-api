class OrganizationManager {

    constructor(database) {
        this.database = database;
    }

    processOrganization(organization) {
        if (!organization.daughters || organization.daughters.length == 0) {
            return Promise.resolve();
        }

        let query = 'INSERT INTO organization (org, org_relative, relation) VALUES ?';
        let values = [];

        organization.daughters.forEach((org, orgIdx) => {

            values.push([organization.org_name, org.org_name, 'daughter']);
            values.push([org.org_name, organization.org_name, 'parent']);

            organization.daughters.forEach((relative, relIdx) => {
                if (orgIdx != relIdx) {
                    values.push([org.org_name, relative.org_name, 'sister']);
                }
            });
        });

        return this.database.getConnection()
            .then((conn) => {
                const res = conn.query(query, [values]);
                conn.release();
                return res;
            });
    }

    createOrganizations(root) {
        let organizations = [root];
        let promises = [];

        while (organizations.length > 0) {
            let currentOrg = organizations.shift();

            if (currentOrg.daughters) {
                organizations = organizations.concat(currentOrg.daughters);
            }

            promises.push(this.processOrganization(currentOrg));
        }

        return Promise.all(promises).then((results) => {
            return results.reduce((acc, r) => {
                return r ? acc + r[0].affectedRows : acc;
            }, 0);
        });
    }

    getOrganizationRelations(name, skip, pageSize) {
        const query = `SELECT DISTINCT relation AS relationship_type,
                                        org_relative AS org_name
                        FROM organization
                        WHERE org = ?
                        ORDER BY org_relative
                        LIMIT ?,?`;

        return this.database.getConnection()
            .then((conn) => {
                const res = conn.execute(query, [name, skip, pageSize]);
                conn.release();
                return res;
            });
    }
}

module.exports = OrganizationManager;