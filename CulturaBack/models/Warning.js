const mongoose = require("mongoose");

const Warning = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now
    },
    start: {
        type: Date,
        required: [true, "The start date is required"]
    },
    end: {
        type: Date,
        required: [true, "The end date is required"]
    },
    active: {
        type: Boolean
    }, 
    title: {
        type: String,
        required: [true, "A title is required"]
    },
    content: {
        type: String,
        required: [true, "The content is required"]
    },
    img:{
        type: String
    },
    deleted: {
        type: Boolean
    }
})

modelu.export = Warning;