const express = require("express")
const urlRoutes = require("./routes/url")
const { connectToMongoDb } = require("./connect")
const URL = require("./models/url")

const app = express()
const port = 8000

connectToMongoDb("mongodb://localhost:27017/ShortURL")

app.use(express.json())

app.use("/url", urlRoutes)
app.get("/:shortID", async (req, res) => {
    const ShortID = req.params.shortID;
    const entity = await URL.findOneAndUpdate(
        {
            shortID: ShortID
        },
        {
            $push: {
                visitedHistory: {
                    timestamps: Date.now()
                }
            }
        })
    res.redirect(entity.redirectURL)
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})