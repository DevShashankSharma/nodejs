const fs = require('fs');

const logReqRes = (fileName) => {
    return (req, res, next) => {
        fs.appendFile(fileName, `${Date.now()} ${req.ip} ${req.method} ${req.url}\n`, (err) => {
            if (err) {
                console.log(err)
            }
            console.log("log saved")
            next()
        })
    }
}

module.exports = {logReqRes}