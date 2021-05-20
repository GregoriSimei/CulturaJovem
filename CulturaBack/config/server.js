'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const routes = require("./routes.js");
const cors = require('cors');
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", routes);

const port = 1234;

app.listen(port, () => {
    console.log(`Server runing port: ${port}`)
});