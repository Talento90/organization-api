class OrganizationManager {

    constructor(database) {
        this.database = database;
    }

    processOrganization(conn, organization) {
        if (!organization.daughters || organization.daughters.length == 0) {
            return Promise.resolve();
        }

        let query = 'INSERT INTO organization (org, org_relative, relation) VALUES ?';
        let values = [];

        organization.daughters.forEach((org, orgIdx) => {

            values.push([organization.org_name, org.org_name, 'parent']);
            values.push([org.org_name, organization.org_name, 'daughter']);

            organization.daughters.forEach((relative, relIdx) => {
                if (orgIdx != relIdx) {
                    values.push([org.org_name, relative.org_name, 'sister']);
                }
            });
        });

        return conn.query(query, [values]);
    }

    createOrganizations(root) {
        const self = this;

        return this.database.getConnection()
            .then((conn) => {
                conn.query('START TRANSACTION')
                    .then(() => {
                        let organizations = [root];
                        let promises = [];

                        while (organizations.length > 0) {
                            let currentOrg = organizations.shift();

                            if (currentOrg.daughters) {
                                organizations = organizations.concat(currentOrg.daughters);
                            }

                            promises.push(self.processOrganization(conn, currentOrg));
                        }

                        return Promise.all(promises);
                    }).then((results) => {
                        return conn.query('COMMIT');
                    })
                    .catch((error) => {
                        conn.query('ROLLBACK');
                        console.log(error);
                    });
            });
    }

    getOrganizationRelations(name) {
        const query = `SELECT DISTINCT relation AS relationship_type,
                                        org_relative AS org_name
                        FROM organization
                        WHERE org = ?
                        ORDER BY org_relative`;

        return this.database.getConnection()
            .then((conn) => {
                const res = conn.execute(query, [name]);
                conn.release();
                return res;
            });
    }
}

module.exports = OrganizationManager;