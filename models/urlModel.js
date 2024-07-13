const mongoose = require("mongoose");

const URLSchema = mongoose.Schema(
  {
    longUrl: { type: String, required: true },
    alias: { type: String },
  },
  { Timestamp: true }
);

const URL = mongoose.model("URL", URLSchema);
module.exports = URL;
