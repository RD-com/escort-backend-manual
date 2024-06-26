const { Users } = require("../../models");
const Joi = require("joi");

const statusSchema = Joi.object({
  status: Joi.string().valid("0", "1"),
});

const users = async (req, res) => {
  try {
    const { error } = statusSchema.validate(req.query);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }
    const userId = req.user.id;
    // const userId = "kp_8e91c150a87240eba6d67ed95f62a1a1";
    const reqStatus = req.query.status;

    const userData = await Users.findAll({
      where: { ref_id: userId, is_approved_affiliate: reqStatus },
      attributes: ["id", "email", "username", "created_at"],
    });

    if (userData.length === 0) {
      return res.status(404).json({ success: false, msg: "User not found!" });
    }

    res.status(200).json({ success: true, userData });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ success: false, msg: "Get username Error" });
  }
};

module.exports = { users };
