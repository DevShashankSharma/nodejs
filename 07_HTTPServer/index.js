const http = require('http');
const fs = require('fs');

const port = 4000;

const server = http.createServer((req, res) => {
    const log = `${Date.now()} ${req.method} ${req.url} : ${req.headers['user-agent']}`;
    fs.appendFile('./server.log', log + '\n', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('log saved');
        switch (req.url) {
            case '/': res.end('Hello world');
                break;
            case '/about': res.end('About');
                break;
            case '/contact': res.end('Contact');
                break;
            default: res.end('Not Found page', 404);
        }
    })
    // console.log('new server received',req.method, req.url);
    // res.end('Hello world');
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
})