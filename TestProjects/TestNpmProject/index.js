const _ = require("lodash");
let numbers = [1, 5, 7, 2, 10, 4, 8];
_.each(numbers, function(x, i) {
    console.log(x);
})