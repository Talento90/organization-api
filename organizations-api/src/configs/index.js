const configs = require(`./config.${process.env.NODE_ENV || "dev"}`);

module.exports.getDatabaseConfig = function () {
    return configs.database;
}

module.exports.getServerConfig = function () {
    return configs.server;
}