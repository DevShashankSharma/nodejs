const express = require('express')  
const userRouter = require("./routes/user")
const { connectToMongoDb } = require("./connection")
const { logReqRes } = require("./middlewares")

const app = express()
const port = 3000


//connection
connectToMongoDb("mongodb://localhost:27017/NodeJS")


//! Writing Middleware
app.use(express.urlencoded({ extended: false }))
app.use(logReqRes("log.txt"))


//! Router 
app.use("/api/users", userRouter)

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})