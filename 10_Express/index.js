const express = require("express");

const app = express();
const port = 4000;

app.get("/", (req, res) => {
    res.send("Hello world from Home page");
})

app.get("/about", (req, res) => {
    res.send("Hello world from About page");
})

app.get("/contact", (req, res) => {
    res.send("Hello world from Contact page"+"hey"+req.query.name);
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})