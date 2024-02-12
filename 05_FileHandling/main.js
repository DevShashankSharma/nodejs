const fs = require("fs");

//Sync
// fs.writeFileSync('./05_FileHandling/test.txt','Hello')

// Async
// fs.writeFile('./05_FileHandling/test.txt','Hello',(err)=>{})

// const result = fs.readFileSync('./05_FileHandling/read.txt','utf-8')
// console.log(result)

fs.readFile("./05_FileHandling/read.txt", "utf-8", (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});


fs.appendFileSync("./05_FileHandling/read.txt",new Date().getDate().toLocaleString())