const mongoose = require("mongoose");

const Verse = new mongoose.Schema({
    content : {
        type: String,
        required: [true, "The content is required"]
    },
    book : {
        type: String,
        required: [true, "the book is required"]
    },
    chap : {
        type: String,
        required: [true, "the chapter is required"]},
    start : {
        type: String,
        required: [true, "the verse start is required"]
    },
    end: {
        type: String,
        required: [true, "the verse end is required"]
    },
    deleted: {
        type: Boolean
    }
})

module.exports = Verse;