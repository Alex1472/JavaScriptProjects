import express from "express";
import cors from "cors";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/api/whoami", (req, res) => {
    res.json({
        ipaddress: req.headers["host"],
        language: req.headers["accept-language"],
        software: req.headers["user-agent"],
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server started");
});
