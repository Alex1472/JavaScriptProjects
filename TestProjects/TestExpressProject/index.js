import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import router from "./routes/api/members.js";

import members from "./public/Members.js";
import { engine } from "express-handlebars";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (req, res) => {
    res.render("index", { title: "Members App", members });
});
app.use("/api/members", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server started"));
