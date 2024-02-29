const mongoose = require("mongoose")

// Connecting to MongoDB
const connectToMongoDb = (url) => {
    return (
        mongoose
            .connect(url)
            .then(() => {
                console.log("Connected to MongoDB")
            })
            .catch((err) => {
                console.log(err)
            })
    )
}

module.exports = {connectToMongoDb}