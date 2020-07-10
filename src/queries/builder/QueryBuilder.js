const Connection = require("../builder/ConnectionBuilder");
const QueryRunner = require("../QueryRunner");
const QueryRunnerBuilder = require("../builder/QueryRunnerBuilder");

module.exports = class QueryBuilder{
    constructor(datasource){
        this.datasource = datasource;
    }

    async build(){
        const connection = await new Connection(
            this.datasource.driver, this.datasource
        ).build();

        const runner = new QueryRunnerBuilder(
            this.datasource.driver, connection
        ).build();
        
        return new QueryRunner(runner);
    }
}