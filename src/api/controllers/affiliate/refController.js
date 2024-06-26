const { Users, Transaction, Wallet } = require("../../models");
const Joi = require("joi");
const { Op, where } = require("sequelize");
require("dotenv").config();

const usernameSchema = Joi.object({
  username: Joi.string(),
});

const referrals = async (req, res) => {
  try {
    const { error } = usernameSchema.validate(req.query);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const reqUsername = req.body.username;
    const userId = req.user.id;
    // const userId = "kp_e9a8bb64d8f9438fa003309edbab885b";

    const usernameData = await Users.findOne({
      where: { username: reqUsername },
      attributes: ["id"],
    });

    if (usernameData.length === 0) {
      return res.status(404).json({ success: false, msg: "User not found!" });
    }

    const refUserId = usernameData.dataValues.id;

    await Users.update({ ref_id: refUserId }, { where: { id: userId } });

    await Wallet.findOrCreate({
      where: { user_id: refUserId },
      attributes: ["id"],
    });

    res
      .status(200)
      .json({ success: true, msg: "affiliate successfully inserted" });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ success: false, msg: "Get username Error" });
  }
};

module.exports = { referrals };
