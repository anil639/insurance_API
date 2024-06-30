const mongoose = require("mongoose");

const acountSchema = new mongoose.Schema({
  accountName: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Account = mongoose.model("Account", acountSchema);
module.exports = Account;
