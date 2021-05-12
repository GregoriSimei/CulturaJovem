const mongoose = require("mongoose");

const Verse = require("./Verse.js");

const Message = new mongoose.Schema({
    title : {
        type: String,
        require: [true, "The message needs a title"]
    },
    imgUrl : {
        type: String
    },
    verses : [Verse],
    deleted : {
        type: Boolean
    }
})

module.exports = Message;