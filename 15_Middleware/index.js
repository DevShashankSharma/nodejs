const express = require('express')
let users = require("../13_Building_Rest_api/MOCK_DATA.json")
const fs = require("fs");
const mongoose = require("mongoose")

const app = express()
const port = 3000

//? Connecting to MongoDB
mongoose.connect('mongodb://localhost:27017/NodeJS')
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((err) => {
        console.log(err)
    })


//! Schema
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: String,
    job_title: {
        type: String,
        required: true
    },
},
    {
        timestamps: true,
    }
)

//! Model
const User = mongoose.model('User', userSchema)


app.use(express.urlencoded({ extended: false }))

//! Writing Middleware
app.use((req, res, next) => {
    console.log('I am a middleware 1')
    req.MyUserName = "Shivam";
    // return res.json({
    //     msg: 'Hello World from Middleware 1'
    // })
    fs.appendFile("./server.log", `${Date.now()} ${req.ip} ${req.method} ${req.url}\n`, (err) => {
        if (err) {
            console.log(err)
        }
        console.log("log saved")
        next()
    })
})
app.use((req, res, next) => {
    console.log('I am a middleware 2', req.MyUserName)
    // return res.end("I am a middleware 2")
    next()
})


//! Create Routes ---> REST API
app.get("/users", async (req, res) => {
    const allDbUsers = await User.find({});
    const html = `
        <ul>
            ${allDbUsers.map(user => `<li>${user.first_name} ${user.last_name}</li>`).join('')}
        </ul>
    `
    res.send(html)
})

app.get("/api/users", async (req, res) => {
    const allDbUsers = await User.find({});
    // console.log("I am in get api", req.MyUserName, req.query)
    console.log(req.headers)
    // res.setHeader('x-myName', "Shivam") //! custom header ---> always add 'x-' in front of header for good practice
    res.json(allDbUsers)
})

app.get("/api/users/:id", async (req, res) => {
    // const id = Number(req.params.id)
    // const user = users.find(user => user.id === id)
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(404).send({ status: "Failed to find user" })
    }
    res.json(user)
})

app.post("/api/users", async (req, res) => {
    let body = req.body
    if (!body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title || !body) {
        return res.status(400).send({ status: "Failed to create new user" })
    }
    // users.push({
    //     id: users.length + 1,
    //     ...body
    // })
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    //     if (err) {
    //         return res.status(500).send({ status: "Failed to create new user" })
    //     }
    //     else {
    //         return res.status(201).send({ status: "Successfully new user created" })
    //     }
    // })

    const newUser = new User({
        ...body
    })

    await newUser.save()
    return res.status(201).send({ status: "Successfully new user created" })
})

app.patch("/api/users/:id", async (req, res) => {
    // const id = Number(req.params.id)
    // const user = users.find(user => user.id === id)
    // user.first_name = req.body.first_name
    // user.last_name = req.body.last_name
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    //     if (err) {
    //         return res.send({ status: "Failed to update user" })
    //     }
    //     else {
    //         return res.send({ status: "Successfully user updated" })
    //     }
    // })

    const user = await User.findByIdAndUpdate(req.params.id, { last_name: 'sshdgf' }) //! findByIdAndUpdate ---> update user by id(req.params.id)
    return res.send({ status: "Successfully user updated" })
})

app.delete("/api/users/:id", async (req, res) => {
    // const id = Number(req.params.id)
    // users = users.filter(user => user.id !== id)
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    //     if (err) {
    //         return res.send({ status: "Failed to delete user" })
    //     }
    //     else {
    //         return res.send({ status: "Successfully user deleted" })
    //     }
    // })

    await User.findByIdAndDelete(req.params.id)
    return res.send({ status: "Successfully user deleted" })
})

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})