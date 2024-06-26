const bcrypt = require("bcrypt");
const Joi = require("joi");
const { Users } = require("../../models");
const { auth, emailSender } = require("../../services");
const { getAccoutTypes } = require("./accountTypeController");
const { accountRegister } = require("./accountRegisterController");

const otpValidateTime = process.env.OTP_VALIDATE_TIME;

const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  otp: Joi.number().integer().required(),
});

const resetPassword = async (req, res) => {
  try {
    const { error } = resetPasswordSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { email, password, otp } = req.body;

    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "Email not registered" });
    }

    const verificationResult = await auth.verifyEmailService(
      email,
      otp,
      otpValidateTime
    );

    if (!verificationResult.success) {
      return res.status(400).json(verificationResult);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const [updateCount] = await Users.update(
      { otp_code: null, password_hash: hashedPassword },
      { where: { email } }
    );

    if (updateCount > 0) {
      res.status(200).json({ success: true, msg: "Password Reset Successful" });
    } else {
      res.status(500).json({ success: false, msg: "Password Reset Failed" });
    }
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ success: false, msg: "Password Reset Error" });
  }
};

module.exports = { resetPassword };
