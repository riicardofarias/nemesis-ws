const _ = require("lodash");
const Endpoint = require("../models/Endpoint");

module.exports = {
    async intercept(req, res, next) {
        try{
            const endpoint = await new Endpoint().find(req.path);

            if(_.isNull(endpoint)){
                return res.status(403).json({"error": "Endpoint não encontrado."});
            }

            if(endpoint.api.status != 'active'){
                return res.status(403).json({"error": "API não encontrada."});
            }

            req.endpoint = endpoint;

            next();
        }catch(err){
            return res.status(401).json({"error": "Unauthorized"});
        }
    }
}