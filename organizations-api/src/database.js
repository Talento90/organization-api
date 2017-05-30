const mysql = require('mysql2/promise');

module.exports.init = function (configs) {

    return mysql.createPool({
        host: process.env.MYSQL_HOST || configs.host,
        user: process.env.MYSQL_USER || configs.user,
        connectionLimit: process.env.MYSQL_CONNECTION_LIMIT || configs.connectionLimit,
        database: configs.database,
        debug: configs.debug
    });
};

