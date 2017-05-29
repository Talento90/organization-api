class OrganizationManager {

    constructor(database) {
        this.database = database;
    }

    processOrganization(conn, organization) {
        if (!organization.daughters || organization.daughters.length == 0) {
            return Promise.resolve();
        }

        let query = 'INSERT IGNORE INTO organization (org, org_relative, relation) VALUES ?';
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

        return conn.query(query, [values]);
    }

    async createOrganizations(root) {
        let organizations = [root];
        let promises = [];
        let conn = null;

        try {
            conn = await this.database.getConnection();

            await conn.query('START TRANSACTION');

            while (organizations.length > 0) {
                let currentOrg = organizations.shift();

                if (currentOrg.daughters) {
                    organizations = organizations.concat(currentOrg.daughters);
                }

                promises.push(this.processOrganization(conn, currentOrg));
            }

            let results = await Promise.all(promises);
            await conn.query('COMMIT');
            await conn.release();

            return results.reduce((acc, r) => {
                return r ? acc + r[0].affectedRows : acc;
            }, 0);
        } catch (error) {
            if (conn != null) {
                await conn.query('ROLLBACK');
            }

            return 0;
        }
    }

    async getOrganizationRelations(name, skip, pageSize) {
        const query = `SELECT relation AS relationship_type,
                              org_relative AS org_name
                        FROM organization
                        WHERE org = ?
                        ORDER BY org_relative
                        LIMIT ?,?`;

        let conn = await this.database.getConnection();
        let res = await conn.execute(query, [name, skip, pageSize]);
        conn.release();
        return res;
    }
}

module.exports = OrganizationManager;