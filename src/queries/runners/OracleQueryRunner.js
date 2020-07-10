const oracledb = require("oracledb");

module.exports = class OracleQueryRunner{
    constructor(connection){
        this._conn = connection;
    }

    async select(sql, args = []){
        const result = await this._conn.execute(sql, args, {
            outFormat: oracledb.OBJECT
        });

        return result.rows;
    }

    async close(){
        await this._conn.close();
    }
}