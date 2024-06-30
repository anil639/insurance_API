const User = require("../Models/user");
const Policy = require("../Models/Policy");

const findPolicyByUserName = async (req, res) => {
  const { userName } = req.params;
  try {
    const user = await User.findOne({ firstName: userName });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const policies = await Policy.find({ userId: user._id })
      .populate("policyCategoryId")
      .populate("companyId");
    // console.log(policies);
    res.status(200).json(policies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { findPolicyByUserName };
