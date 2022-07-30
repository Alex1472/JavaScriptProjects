const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const dns = require("dns");
const url = require("url");

dotenv.config();

function lookupPromise(hostname) {
    return new Promise((resolve, reject) => {
        dns.lookup(hostname, (err, address, family) => {
            if (err) reject();
            else resolve();
        });
    });
}

const urlSchema = mongoose.Schema({
    url: String,
});
const DBUrl = mongoose.model("urls", urlSchema);

mongoose.connect(process.env.MONGO_URI, () => console.log("Connected to db!"));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.post("/api/shorturl", async (req, res) => {
    try {
        const url = new URL(req.body.url);
        await lookupPromise(url.hostname);

        const dbUrl = new DBUrl({ url: req.body.url });
        await dbUrl.save();
        res.json({ original_url: dbUrl.url, short_url: dbUrl.id });
    } catch (err) {
        res.json({ error: "invalid url" });
    }
});

app.get("/api/shorturl/:id", async (req, res) => {
    try {
        const urls = await DBUrl.findById(req.params.id);
        res.redirect(urls.url);
    } catch (err) {
        res.json({ error: "incorrect id" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening port ${PORT}`));
