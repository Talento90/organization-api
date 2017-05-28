const mysql = require('mysql2/promise');

module.exports.init = function (configs) {

    return mysql.createPool({
        host: configs.host,
        user: configs.user,
        //password: configs.password,
        connectionLimit: configs.connectionLimit,
        database: configs.database,
        debug: configs.debug
    });
};

