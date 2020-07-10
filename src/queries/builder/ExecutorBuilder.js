module.exports = class ExecutorBuilder{
    constructor(endpoint){
        this.endpoint = endpoint;
    }

    build(){
        const {api: {datasource}} = this.endpoint; 

        console.log(datasource);

        throw Exception('Unknown driver');
    }
}