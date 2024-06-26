const { Users, ApprovalStatus, Escort } = require("../../../../models");
const Joi = require("joi");

const verifySchema = Joi.object({
  escortId: Joi.string().required(),
  status: Joi.string().valid("0", "1").required(),
});

/*
  0-unverified
  1-verified
*/

const verifyAccount = async (req, res) => {
  try {
    const { error } = verifySchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }
    const { escortId, status } = req.body;

    const escort = await Escort.findOne({ where: { user_id: escortId } });
    if (!escort) {
      return res.status(404).json({ success: false, msg: "Escort not found!" });
    }

    await Users.update(
      { is_account_verified: status },
      { where: { id: escortId } }
    );

    const state = status == "1" ? "1" : "2";

    await ApprovalStatus.update(
      {
        is_newcomer_verified: state,
      },
      { where: { user_id: escortId } }
    );
    const successMsg =
      status === "1"
        ? "User account verified Successfully!"
        : "User account is not verified!";
    return res.status(200).json({ success: true, msg: successMsg });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({
      success: false,
      msg: "User verified Error",
    });
  }
};

module.exports = { verifyAccount };
