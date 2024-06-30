const mongoose = require("mongoose");

const lobSchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
});

const LOB = mongoose.model("LOB", lobSchema);
module.exports = LOB;
