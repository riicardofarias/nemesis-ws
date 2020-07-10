const _ = require("lodash");
const ValidationException = require("../exception/ValidationException");

module.exports = {
    queryFor(sql, params = []){
        const regex = /:([a-zA-Z0-9]+)/gm
        
        while(m = regex.exec(sql)){
            const name = m[0];
            const value = params[m[1]];

            if(!value){
                throw new ValidationException(`Parâmetro ${name} esperado.`);
            }

            sql = _.replace(sql, name, value);
        }

        return sql;
    }
}