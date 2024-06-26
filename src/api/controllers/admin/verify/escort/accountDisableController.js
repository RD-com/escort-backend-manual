const { Users, Escort } = require("../../../../models");
const Joi = require("joi");

const enableSchema = Joi.object({
  escortId: Joi.string().required(),
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
    const { escortId, status } = req.body;

    const escort = await Escort.findOne({ where: { user_id: escortId } });
    if (!escort) {
      return res.status(404).json({ success: false, msg: "Escort not found!" });
    }

    await Users.update({ is_disabled: status }, { where: { id: escortId } });
    const successMsg =
      status === "0"
        ? "User account enable Successfully!"
        : "User account disable Successfully!";
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
