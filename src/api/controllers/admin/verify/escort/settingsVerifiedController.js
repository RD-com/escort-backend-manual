const { ApprovalStatus } = require("../../../../models");
const { verifyEscortAccount } = require("./escortAccountVerifyController");
const Joi = require("joi");

const verifySchema = Joi.object({
  escortId: Joi.string().required(),
  isApproved: Joi.string().valid("1", "2").required(),
});

const approveSettings = async (req, res) => {
  try {
    const { error } = verifySchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { escortId, isApproved } = req.body;

    const updateResult = await ApprovalStatus.update(
      { is_settings_verified: isApproved },
      { where: { user_id: escortId } }
    );

    if (updateResult[0] === 0) {
      return res.status(404).json({ success: false, msg: "Escort not found!" });
    }

    await verifyEscortAccount(escortId);

    const successMsg =
      isApproved === "1"
        ? "Escort settings approved Successfully!"
        : "Escort settings rejected Successfully!";

    res.status(200).json({ success: true, msg: successMsg });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ success: false, msg: "User verified Error" });
  }
};

module.exports = { approveSettings };
