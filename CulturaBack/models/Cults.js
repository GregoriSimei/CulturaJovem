const mongoose = require("mongoose");

const Message = require("./Message.js");
const Warning = require("./Warning.js");
const Schedule = require("./Schedule.js");

const Cults = new mongoose.Schema({
    title: {
        type: String
    },
    message : Message,
    warnings : [Warning],
    schedules : [Schedule],
    link : {
        type: String
    },
    date : {
        type: Date,
        required: [true, "The date is required"]
    },
    period : {
        type: String,
        enum: ["morning", "evening"]
    },
    deleted : {
        type: Boolean
    },
    createdIn: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("cults", Cults);