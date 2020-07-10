const Database = require("../config/Database");
const _ = require("lodash");

class ScriptQuery{
    async findByEvent(queryId, event = 'AFTER_FIND'){
        let db = new Database();
        
        try{
            return _.first(await db.query("SELECT * FROM scripts_queries WHERE query_id = ? AND event = ? AND status = ?", [
                queryId, event, 'active'
            ]));
        }finally{
            db.close();
        }
    }
}

module.exports = ScriptQuery;