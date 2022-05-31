const http = require("http");

http.createServer((req, resp) => {
    resp.write("Hello world!");
    resp.end();
}).listen(3000, () => console.log("Server running!"));