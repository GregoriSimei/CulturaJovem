const mongoose = require("mongoose");
const dbconfig = require("../passwords.json");

var db = dbconfig.database;
var user = db.user;
var password = db.password;
var collection = db.name;

const DB_URL = `mongodb+srv://${user}:${password}@mongotests.cl2v0.mongodb.net/${collection}?retryWrites=true&w=majority`;

const database = mongoose.connect(DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

mongoose.connection.on("connected", () => {
    console.log("Database Application Connected");
});

mongoose.connection.on("error", () => {
    console.log("Occoured some error during the Database connection");
});

mongoose.connection.on("disconnected", () => {
    console.log("Database Application Disconnected");
});

module.exports = database;