const mysql = require("mysql2");

module.exports = function(){
    return mysql.createConnection({
        multipleStatements: true,
        host: "172.19.0.9",
        port: 3306,
        database: "nemesis",
        user: "nemesis",
        password: "nemesis",
        typeCast: (field, useDefaultTypeCasting) => {
            if (field.type === "BIT" && field.length === 1) {
                var bytes = field.buffer()
                return bytes[0] === 1
            }
            
            return useDefaultTypeCasting()
        }
    });
};