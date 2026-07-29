const mongoose = require("mongoose");
const photoSchema = new mongoose.Schema({

title: {
    type: String,
    required: true,
    trim: true
},

description: {
    type: String,
    default: ""
},

imageUrl: {
    type: String,
    required: true
},

imageKey: {
    type: String,
    required: true
},

category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
},

user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
},

likes: {
    type: Number,
    default: 0
},

}, {
    timestamps: true
});



module.exports = mongoose.model(
    "Photo",
    photoSchema
);
