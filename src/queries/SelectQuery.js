const templateSql = require("../queries/NamedParameterTemplate");

module.exports = class SelectRunner{
    constructor(queryRunner){
        this.queryRunner = queryRunner;
    }

    async executeQuery(sql, params = []){
        try{
            return await this.queryRunner.select(
                templateSql.queryFor(sql, params)
            );
        }finally{
            this.queryRunner.close();
        }
    }
}