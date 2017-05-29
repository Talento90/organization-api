CREATE DATABASE organizations;
USE organizations;

CREATE TABLE organization (
    org VARCHAR(50),
    org_relative VARCHAR(50),
    relation ENUM('parent', 'sister', 'daughter'),
    PRIMARY KEY(org, org_relative, relation)
);

CREATE INDEX org ON organization (org);
CREATE INDEX org_relative ON organization (org_relative);

-- INSERT IGNORE INTO organization (org, org_relative, relation) values
-- ('Paradise Island', 'Banana tree', 'daughter'),
-- ('Banana tree', 'Paradise Island', 'parent'),
-- ('Paradise Island', 'Big banana tree', 'daughter'),
-- ('Big banana tree', 'Paradise Island', 'parent'),
-- ('Banana tree', 'Big banana tree', 'sister'),
-- ('Big banana tree', 'Banana tree', 'sister'),
-- ('Banana tree', 'Yellow Banana', 'daughter'),
-- ('Banana tree', 'Brown Banana', 'daughter'),
-- ('Banana tree', 'Black Banana', 'daughter'),
-- ('Yellow Banana', 'Banana tree', 'parent'),
-- ('Brown Banana', 'Banana tree', 'parent'),
-- ('Black Banana', 'Banana tree', 'parent'),
-- ('Yellow Banana', 'Brown Banana', 'sister'),
-- ('Yellow Banana', 'Black Banana', 'sister'),
-- ('Brown Banana', 'Yellow Banana', 'sister'),
-- ('Brown Banana', 'Black Banana', 'sister'),
-- ('Black Banana', 'Yellow Banana', 'sister'),
-- ('Black Banana', 'Brown Banana', 'sister'),
-- ('Yellow Banana', 'Big banana tree', 'parent'),
-- ('Brown Banana', 'Big banana tree', 'parent'),
-- ('Green Banana', 'Big Banana tree', 'parent'),
-- ('Black Banana', 'Big banana tree', 'parent'),
-- ('Big Banana tree', 'Yellow Banana', 'daughter'),
-- ('Big Banana tree', 'Brown Banana', 'daughter'),
-- ('Big Banana tree', 'Green Banana', 'daughter'),
-- ('Big Banana tree', 'Black Banana', 'daughter'),
-- ('Yellow Banana', 'Brown Banana', 'sister'),
-- ('Yellow Banana', 'Black Banana', 'sister'),
-- ('Yellow Banana', 'Green Banana', 'sister'),
-- ('Brown Banana', 'Yellow Banana', 'sister'),
-- ('Brown Banana', 'Black Banana', 'sister'),
-- ('Brown Banana', 'Green Banana', 'sister'),
-- ('Black Banana', 'Yellow Banana', 'sister'),
-- ('Black Banana', 'Brown Banana', 'sister'),
-- ('Black Banana', 'Green Banana', 'sister'),
-- ('Green Banana', 'Yellow Banana', 'sister'),
-- ('Green Banana', 'Brown Banana', 'sister'),
-- ('Green Banana', 'Black Banana', 'sister'),
-- ('Black Banana', 'Phoneutria Spider', 'daughter'),
-- ('Phoneutria Spider', 'Black Banana', 'parent')