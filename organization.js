const request = require('./request1');


let repository = [];

function insertOrganization(organization) {

    if (!organization.daughters || organization.daughters.length === 0)
        return 0;

    let rows = [];

    organization.daughters.forEach((org, orgIdx) => {

        rows.push({ org: organization.org_name, rel_org: org.org_name, rel: 'parent' });
        rows.push({ org: org.org_name, rel_org: organization.org_name, rel: 'daugther' });

        organization.daughters.forEach((relative, relIdx) => {
            if (orgIdx != relIdx) {
                rows.push({ org: org.org_name, rel_org: relative.org_name, rel: 'sister' })
            }
        });
    });

    //Insert Database
    repository = repository.concat(rows);

    return rows.length;
}

function printOrganizations(root) {

    let organizations = [root];
    let numOrganizations = 0;

    while (organizations.length > 0) {
        let currentOrg = organizations.shift();

        if (currentOrg.daughters) {
            organizations = organizations.concat(currentOrg.daughters);
        }

        numOrganizations += insertOrganization(currentOrg);
    }

    return numOrganizations;
}

console.log(printOrganizations(request));

let result = repository
            .filter((row) => { return row.org === 'Black Banana'; } )
            .sort((a,b) => { return a.rel_org.localeCompare(b.rel_org); })
            .map((org) => { return { relationship_type: org.rel, org_name: org.rel_org }; });

console.log(result);