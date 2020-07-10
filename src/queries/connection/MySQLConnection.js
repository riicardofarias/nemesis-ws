const mysql = require("mysql2");

module.exports = class MySQLConnection{
    async create(config){
        const port = config.port || 3306;

        return mysql.createConnection({
            multipleStatements: true,
            host: config.host,
            port: port,
            database: config.name,
            user: config.username,
            password: config.password,
            typeCast: (field, useDefaultTypeCasting) => {
                if (field.type === "BIT" && field.length === 1) {
                    var bytes = field.buffer()
                    return bytes[0] === 1
                }
                
                return useDefaultTypeCasting()
            }
        });
    }
}