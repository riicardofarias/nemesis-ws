const SelectQuery = require("../queries/SelectQuery");
const log = require("log");

module.exports = class QueryRunner{
    constructor(runner){
        this.runner = runner;
    }

    select(sql, args = []){
        return new SelectQuery(this.runner).executeQuery(sql, args);
    }
}