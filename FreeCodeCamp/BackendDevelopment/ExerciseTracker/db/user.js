import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: String,
});

export default mongoose.model("users", userSchema);
