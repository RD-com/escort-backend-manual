const { Users, Member } = require("../../../../models");
const Joi = require("joi");

const enableSchema = Joi.object({
  memberId: Joi.string().required(),
  status: Joi.string().valid("0", "1").required(),
});

/*
  0-enable
  1-disable
*/

const disableAccount = async (req, res) => {
  try {
    const { error } = enableSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }
    const { memberId, status } = req.body;

    const member = await Member.findOne({ where: { user_id: memberId } });
    if (!member) {
      return res.status(404).json({ success: false, msg: "Member not found!" });
    }

    await Users.update({ is_disabled: status }, { where: { id: memberId } });
    const successMsg =
      status === "0"
        ? "Member account enable Successfully!"
        : "Member account disable Successfully!";
    return res.status(200).json({ success: true, msg: successMsg });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({
      success: false,
      msg: "User enable Error",
    });
  }
};

module.exports = { disableAccount };
