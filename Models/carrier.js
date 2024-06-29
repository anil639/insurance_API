const mongoose = require("mongoose");

const carrierSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Carrier", carrierSchema);
