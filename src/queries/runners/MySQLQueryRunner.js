module.exports = class MySQLQueryRunner{
    constructor(connection){
        this._conn = connection;
    }

    select(sql, args){
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