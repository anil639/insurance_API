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
    type: Schema.Types.ObjectId,
    ref: "LOB",
    required: true,
  },
  companyId: {
    type: Schema.Types.ObjectId,
    ref: "Carrier",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
module.exports = mongoose.model("Policy", policySchema);
