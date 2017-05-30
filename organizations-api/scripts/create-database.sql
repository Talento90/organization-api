CREATE DATABASE organizations;
USE organizations;

CREATE TABLE organization (
    org VARCHAR(50),
    org_relative VARCHAR(50),
    relation ENUM('parent', 'sister', 'daughter'),
    PRIMARY KEY(org, org_relative, relation)
);

CREATE INDEX org_org_relative_idx ON organization (org, org_relative);