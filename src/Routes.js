const express = require("express");
const routes = express.Router();

const interceptor = require("./interceptor/Interceptor");
const indexCtrl = require("./controllers/IndexCtrl");

// Interceptor
routes.use(interceptor.intercept);

// Index
routes.get("/*", indexCtrl.select);

module.exports = routes;

