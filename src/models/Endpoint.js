const Database = require("../config/Database");
const _ = require("lodash");

class Endpoint{
    async find(path){
        let db = new Database();
        try{
            const endpoint = _.first(await db.query("SELECT * FROM endpoints WHERE endpoint = ? and status = ?", [path, 'active']));
            
            if(endpoint){
                const api = _.first(await db.query("SELECT * FROM apis WHERE id = ?", [endpoint.api_id]));
                api.datasource = _.first(await db.query("SELECT * FROM datasources WHERE id = ?", [api.datasource_id]));

                endpoint.api = api;
                endpoint.query = _.first(await db.query("SELECT * FROM queries WHERE endpoint_id = ?", [endpoint.id]));

                return endpoint;
            }

            return null;
        }finally{
            db.close();
        }
    }
}

module.exports = Endpoint;