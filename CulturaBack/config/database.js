const mongoose = require("mongoose");

const DB_URL = "mongodb+srv://traininggreg:GiSiMaSs21-*@mongotests.cl2v0.mongodb.net/CulturaJovem?retryWrites=true&w=majority";

const db = mongoose.connect(DB_URL,
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

module.exports = db;