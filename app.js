const express = require("express");
const app = express();
const bodyParse = require("body-parser");
const cors = require("cors");
const routes= require("./src/routes");

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));
app.use(cors());
require("./src/data/db").connect();
//app.use(require("./src/routes"))
app.use(routes);

module.exports = app;
