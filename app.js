const express  = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors({
    origin: true, allowedHeaders: ['Authorization']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', require('./src/Routes'));

app.listen(5002);