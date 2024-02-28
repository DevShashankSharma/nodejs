const mongoose = require("mongoose")
mongoose.set('strictQuery', true);

// Connecting to MongoDB

async function connectToMongoDb(url) {
    return (
        mongoose.connect(url)
            .then(() => {
                console.log("Connected to MongoDB")
            })
            .catch((err) => {
                console.log(err)
            })
    )
}

module.exports = {connectToMongoDb}