const oracledb = require("oracledb");

module.exports = class OracleConnection{
    create(config){
        const port = config.port || 1521;

        return oracledb.getConnection({
            user: config.username,
            password: config.password,
            connectString: `${config.host}:${port}/${config.name}`
        });
    }
}