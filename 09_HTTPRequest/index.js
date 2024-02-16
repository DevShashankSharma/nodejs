const http = require("http");
const fs = require("fs");
const url = require("url");

const port = 4000;

const server = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") {
        return res.end();
    }
    const log = `${Date.now()} ${req.method} ${req.url} `;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);

    fs.appendFile("./server.log", log + "\n", (err) => {
        if (err) {
            console.log(err);
        }
        console.log("log saved");
        switch (myUrl.pathname) {
            case "/":
                res.end("Hello world");
                break;
            case "/about":
                const userName = myUrl.query.name;
                res.end(`About ${userName}`);
                break;
            case "/contact":
                res.end("Contact");
                break;
            case "/search":
                const search = myUrl.query.search_query;
                res.end(`Search ${search}`);
                break;
            default:
        }
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
