const mongoose = require("mongoose");

const Schedule = new mongoose.Schema({
    sequence : {
        type: String,
        required : [true, "the sequence is needed"]
    },
    title : {
        type: String,
        requied: [true, "The title is needed"]
    },
    owner : {
        type: String,
        required: [true, "The schedule needs a owner"]
    },
    deleted : {
        type: Boolean
    }
})

module.exports = Schedule;