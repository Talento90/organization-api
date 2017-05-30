const configs = require("./configs");
const database = require('./database');
const server = require("./server");

// Catch unhandling unexpected exceptions
process.on('uncaughtException', (error) => {
    console.error(`uncaughtException ${error.message}`);
});

// Catch unhandling rejected promises
process.on('unhandledRejection', (reason) => {
    console.error(`unhandledRejection ${reason}`);
});

const dbConfig = configs.getDatabaseConfig();
const db = database.init(dbConfig);

const serverConfig = configs.getServerConfig();
const appServer = server.init(serverConfig, db);

appServer.listen(process.env.PORT || serverConfig.port, () => {
    console.log('Server running at:', serverConfig.port);
});

