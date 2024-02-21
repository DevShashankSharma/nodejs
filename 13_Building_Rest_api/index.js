const express = require("express");
let users = require("./MOCK_DATA.json")
const fs = require("fs");

const app = express();
const port = 4000;

app.use(express.urlencoded({ extended: true }))

app.get("/users", (req, res) => {
    const html = `
        <ul>
            ${users.map(user => `<li>${user.first_name} ${user.last_name}</li>`).join('')}
        </ul>
    `
    res.send(html)
})

app.get("/api/users", (req, res) => {
    res.json(users)
})

// app.get("/api/users/:id", (req, res) => { 
//     const id = Number(req.params.id)
//     const user = users.find(user => user.id === id)
//     res.json(user)
// })

app.post("/api/users", (req, res) => {
    let body = req.body
    users.push({
        id: users.length + 1,
        ...body
    })
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) {
            return res.send({ status: "Failed to create new user" })
        }
        else {
            return res.send({ status: "Successfully new user created" })
        }
    })
})

app.patch("/api/users/:id", (req, res) => {
    const id = Number(req.params.id)
    const user = users.find(user => user.id === id)
    user.first_name = req.body.first_name
    user.last_name = req.body.last_name
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) {
            return res.send({ status: "Failed to update user" })
        }
        else {
            return res.send({ status: "Successfully user updated" })
        }
    })
})

app.delete("/api/users/:id", (req, res) => {
    const id = Number(req.params.id)
    users = users.filter(user => user.id !== id)
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) {
            return res.send({ status: "Failed to delete user" })
        }
        else {
            return res.send({ status: "Successfully user deleted" })
        }
    })
})

// app.route("/api/users/:id").get((req, res) => {
//     const id = Number(req.params.id)
//     const user = users.find(user => user.id === id)
//     res.json(user)
// }).post((req, res) => {
//     // Todo create new user
//     return res.send({ status: "Create new user pending" })
// }).patch((req, res) => {
//     // Todo update user with id 
//     return res.send({ status: "Update user pending" })
// }).delete((req, res) => {
//     // Todo delete user with id 
//     return res.send({ status: "Delete user pending" })
// })

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})