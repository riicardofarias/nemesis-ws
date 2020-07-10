const QueryExecutor = require("../queries/executors/QueryExecutor");
const ValidationException = require("../exception/ValidationException");

module.exports = {
    async select(req, res){
        try{
            const endpoint = req.endpoint;
            const {query} = req;

            return res.send(
                await new QueryExecutor(endpoint, query).run()
            );
        }catch(err){
            if(err instanceof ValidationException){
                return res.status(400).send({"error": err.message});
            }

            return res.status(500).send({"error": "Ocorreu um erro desconhecido."});
        }
    }
}