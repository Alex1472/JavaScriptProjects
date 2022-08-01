import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { join } from "path";
import User from "./db/user.js";
import Exercise from "./db/exercise.js";
import cors from "cors";

dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "/views/index.html"));
});
app.post("/api/users", async (req, res) => {
    try {
        const newUser = new User({ username: req.body.username });
        const { _id, username } = await newUser.save();
        res.json({ _id, username });
    } catch (err) {
        res.json({ error: err });
    }
});
app.get("/api/users", async (req, res) => {
    try {
        const users = await User.find({}, { _id: 1, username: 1 });
        res.json(users);
    } catch (err) {
        res.json({ error: err });
    }
});
app.post("/api/users/:_id/exercises", async (req, res) => {
    try {
        const newExercise = new Exercise({
            user: req.params._id,
            description: req.body.description,
            duration: parseInt(req.body.duration),
            date: req.body.date ? new Date(req.body.date) : new Date(),
        });
        const addedExercise = await newExercise.save();
        await addedExercise.populate("user");
        const response = {
            _id: addedExercise.user._id,
            username: addedExercise.user.username,
            date: addedExercise.date.toDateString(),
            duration: addedExercise.duration,
            description: addedExercise.description,
        };
        res.json(response);
    } catch (err) {
        res.json({ error: err });
    }
});
app.get("/api/users/:_id/logs", async (req, res) => {
    try {
        const user = await User.findById(req.params._id);

        const filter = {
            user: req.params._id,
        };
        if (req.query.from || req.query.to) filter.date = {};
        if (req.query.from) filter.date["$gt"] = new Date(req.query.from);
        if (req.query.to) filter.date["$lt"] = new Date(req.query.to);
        let limit = req.query.limit ?? 100;
        let exercises = await Exercise.find(filter, {
            description: 1,
            duration: 1,
            date: 1,
            _id: 0,
        }).limit(limit);
        exercises = exercises.map((item) => ({
            description: item.description,
            duration: item.duration,
            date: item.date.toDateString(),
        }));
        res.json({
            username: user.username,
            count: exercises.length,
            _id: user._id,
            log: exercises,
        });
    } catch (err) {
        res.json({ error: err });
    }
});

mongoose.connect(
    "mongodb+srv://Alex147:89178917@cluster0.1p3np.mongodb.net/ExerciseTracker?retryWrites=true&w=majority",
    () => console.log("Connected to Db."),
    (err) => console.log(err)
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server has started!"));
