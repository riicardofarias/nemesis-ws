const _eval = require("node-eval");

module.exports = class ScriptRunner{
    async run(script, data){
        const sc = _eval(script, 'script.js', {});
        return sc.handler(data);
    }
}