const Connection = require("./Connection");

module.exports = class Database{
    constructor(){
        this._conn = new Connection();
    }

    query(sql, args){
        return new Promise((resolve, reject) => {
            this._conn.query(sql, args, (err, rows) => {
                if(err) reject(err);
                resolve(rows);
            });
        });
    }

    close(){
        return new Promise((resolve, reject) => {
            this._conn.end(err => {
                if(err) reject(err);
                resolve();
            });
        });
    }
}