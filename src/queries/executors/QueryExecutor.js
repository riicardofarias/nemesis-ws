const QueryBuilder = require("../builder/QueryBuilder");
const ScriptRunner = require("../ScriptRunner");
const ScriptQuery = require("../../models/ScriptQuery");
const escape = require("sql-escape");
const _ = require("lodash");

module.exports = class QueryExecutor{
    constructor(endpoint, params = []){
        this.endpoint = endpoint;
        this.params = params;
        this.rows = [];
    }

    async run(){
        const { query, api: { datasource } } = this.endpoint;
        const runner = await new QueryBuilder(datasource).build();
        
        // Before find
        await this._beforeFind(query);

        // Rows
        this.rows = await runner.select(query.query, this.params);
        
        // After find
        await this._afterFind(query);
        
        // Return rows
        return this.rows;
    }

    async _beforeFind(query){
        // Escape values
        for(const[key, value] of Object.entries(this.params)){
            this.params[key] = escape(value);
        }

        if(!query.has_script)
            return;

        const sq = await new ScriptQuery().findByEvent(query.id, 'BEFORE_FIND');
        if(!_.isNil(sq)){
            const { params } = await new ScriptRunner().run(sq.script, { 
                params: this.params 
            });

            this.params = params;
        }
    }

    async _afterFind(query){
        if(!query.has_script)
            return;

        const sq = await new ScriptQuery().findByEvent(query.id, 'AFTER_FIND');
        if(!_.isNil(sq)){
            this.rows = await new ScriptRunner().run(sq.script, { 
                records: this.rows 
            });
        }
    }
}