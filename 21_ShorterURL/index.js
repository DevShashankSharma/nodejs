const express = require("express")
const urlRoutes = require("./routes/url")
const { connectToMongoDb } = require("./connect")
const URL = require("./models/url")
const path = require("path")
const staticRouter = require("./routes/staticRouter")

const app = express()
const port = 8000

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views')); 

connectToMongoDb("mongodb://localhost:27017/ShortURL")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", staticRouter)

app.use("/url", urlRoutes)
app.get("/url/:shortID", async (req, res) => {
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