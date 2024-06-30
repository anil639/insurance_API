const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  policyNumber: {
    type: String,
    required: true,
  },
  policyStartDate: {
    type: Date,
    required: true,
  },
  policyEndDate: {
    type: Date,
    required: true,
  },
  policyCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LOB",
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Carrier",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Policy = mongoose.model("Policy", policySchema);
module.exports = Policy;
