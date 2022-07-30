const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
    url: String,
});

module.exports.DBUrl = mongoose.model("urls", urlSchema);
