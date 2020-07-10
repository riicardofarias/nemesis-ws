const MySQLRunner = require("../runners/MySQLQueryRunner");
const OracleRunner = require("../runners/OracleQueryRunner");

module.exports = class QueryRunnerBuilder{
    constructor(type, connection){
        this.type = type;
        this.connection = connection;
    }

    build(){
        switch(this.type){
            case 'mysql' : return new MySQLRunner(this.connection);
            case 'oracle': return new OracleRunner(this.connection);
        }

        throw Exception('Unknown driver');
    }
}