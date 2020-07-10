const MySQL = require("../connection/MySQLConnection");
const Oracle = require("../connection/OracleConnection");

module.exports = class ConnectionBuilder{
    constructor(type, config){
        this.type = type;
        this.config = config;
    }

    build(){
        switch(this.type){
            case 'mysql' : return new MySQL().create(this.config);
            case 'oracle': return new Oracle().create(this.config);
        }

        throw Exception('Unknown driver');
    }
}