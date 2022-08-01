import mongoose from "mongoose";

const exersiceSchema = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "users",
    },
    description: String,
    duration: Number,
    date: Date,
});

export default mongoose.model("exercises", exersiceSchema);
