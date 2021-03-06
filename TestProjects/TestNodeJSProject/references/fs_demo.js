const path = require('path');
const fs = require('fs');

fs.mkdir(path.join(__dirname, "test"), {}, err => {
    if(err) throw err;
    console.log("Folder created");
});

fs.writeFile(path.join(__dirname, "test", "hello.txt"), "Hello world!" , err => {
    if(err) throw err;
    console.log("File written...");
});


fs.appendFile(path.join(__dirname, "test", "hello.txt"), " I love node.js!", err => {
    if(err) throw err;
    console.log("Data appended");
});

fs.readFile(path.join(__dirname, "test", "hello.txt"), "utf8", (err, data) => {
    if(err) throw err;
    console.log(data);
});

fs.rename(path.join(__dirname, "test", "hello.txt"), path.join(__dirname, "test", "helloworld.txt"), err => {
    if(err) throw err;
    console.log("File renamed!");
});

