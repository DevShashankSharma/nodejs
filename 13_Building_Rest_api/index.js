const express = require("express");
const users = require("./MOCK_DATA.json")

const app = express();
const port = 4000;

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

// app.post("/api/users", (req, res) => {
//     // Todo create new user
//     return res.send("Create new user pending")
// })

// app.patch("/api/users/:id", (req, res) => {
//     // Todo update user with id 
//     return res.send("Update user pending")
// })

// app.delete("/api/users/:id", (req, res) => {
//     // Todo delete user with id 
//     return res.send("Delete user pending")
// })

app.route("/api/users/:id").get((req, res) => {
    const id = Number(req.params.id)
    const user = users.find(user => user.id === id)
    res.json(user)
}).post((req, res) => {
    // Todo create new user
    return res.send({ status: "Create new user pending" })
}).patch((req, res) => {
    // Todo update user with id 
    return res.send({ status: "Update user pending" })
}).delete((req, res) => {
    // Todo delete user with id 
    return res.send({ status: "Delete user pending" })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})