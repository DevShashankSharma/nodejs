const mongoose = require("mongoose")

//! Schema
const urlSchema = new mongoose.Schema({
    shortID: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: {
        type: String,
        required: true
    },
    visitedHistory: [
        {
            timestamps: {
                type: Number
            }
        }
    ]
},
    {
        timestamps: true,
    }
)

//! Model
const Url = mongoose.model("Url", urlSchema)

module.exports = Url