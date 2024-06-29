const mongoose = require("mongoose");

const acountSchema = new mongoose.Schema({
  accountName: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Account", acountSchema);
