const { auth } = require("../../../services");
const Joi = require("joi");

const otpValidateTime = process.env.OTP_VALIDATE_TIME;

const emailSchema = Joi.object({
  email: Joi.string().email().required(),
  verificationCode: Joi.number().integer().required(),
});

const verifyEmail = async (req, res) => {
  try {
    const { error } = emailSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { email, verificationCode } = req.body;

    const verificationResult = await auth.verifyEmailService(
      email,
      verificationCode,
      otpValidateTime
    );

    if (!verificationResult.success) {
      return res.status(400).json(verificationResult);
    }

    res.json(verificationResult);
  } catch (error) {
    console.error("Internal Server Error", error);
    res.status(500).json({ success: false, msg: "Failed to verify email" });
  }
};

module.exports = { verifyEmail };
