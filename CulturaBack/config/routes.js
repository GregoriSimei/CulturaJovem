const express = require('express');
const app = express();
const CultRoute = require('../routes/CultRoute');

app.use("/cult", CultRoute);

module.exports = app;