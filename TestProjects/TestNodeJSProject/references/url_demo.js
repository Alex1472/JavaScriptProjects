const url = require("url");

let myUrl = new URL("http://myWebsite.com/hello.html?active=true&id=100");

console.log(myUrl.href);
console.log(myUrl.toString());
console.log(myUrl.host);
console.log(myUrl.hostname);
console.log(myUrl.pathname);
console.log(myUrl.search);
console.log(myUrl.searchParams);

myUrl.searchParams.append("param", "data");
console.log(myUrl.search);

myUrl.searchParams.forEach((name, value) => console.log(`Name: ${name} Value: ${value}`));