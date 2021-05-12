const mongoose = require("mongoose");

const db = mongoose.connect("mongodb+srv://traininggreg:GiSiMaSs21-*@mongotests.cl2v0.mongodb.net/CulturaJovem?retryWrites=true&w=majority",
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