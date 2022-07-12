const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

const sendResponce = (date, res) => {
    res.json({
        unix: date.getTime(),
        utc: date.toUTCString(),
    });
};

app.get("/api", (req, res) => {
    sendResponce(new Date(), res);
});
app.get("/api/:date", (req, res) => {
    let date = new Date(req.params.date);
    if (date != "Invalid Date") {
        sendResponce(date, res);
        return;
    }
    let milliseconds = parseInt(req.params.date);
    if (milliseconds) {
        date = new Date(milliseconds);
        sendResponce(date, res);
        return;
    }
    res.json({
        error: "Invalid Date",
    });
});

const PORT = 3000;
const listener = app.listen(3000, function () {
    console.log("Your app is listening on port " + listener.address().port);
});
