const { Users } = require("../../../models");
const Joi = require("joi");
const { auth, emailSender } = require("../../../services");

const otpSchema = Joi.object({
  email: Joi.string().email().required(),
});

const resendOTP = async (req, res) => {
  try {
    const { error } = otpSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { email } = req.body;

    const userData = await Users.findOne({ where: { email } });

    if (!userData) {
      return res
        .status(400)
        .json({ success: false, msg: "Email not registered" });
    }

    const otpCode = await auth.generateOTPCode();
    await emailSender.verification(email, otpCode);

    const user = await Users.update(
      { otp_code: otpCode, otp_time: new Date() },
      { where: { email } }
    );

    const [userRawCount] = user;
    if (userRawCount == 0) {
      return res.status(404).json({
        success: false,
        msg: "Email not found!",
      });
    }
    res.status(200).json({
      success: true,
      msg: "OTP Send successfully",
    });
  } catch (error) {
    console.error("Internal Server Error", error);
    res.status(500).json({ success: false, msg: "Failed to verify email" });
  }
};

module.exports = { resendOTP };
