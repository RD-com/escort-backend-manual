// emailVerificationService.js

const { Users } = require("../../models");

const verifyEmailService = async (email, verificationCode, otpValidateTime) => {
  try {
    const user = await Users.findOne({
      where: { email, otp_code: verificationCode },
    });

    if (!user || user.otp_code == null) {
      console.error("Invalid verification code");
      return { success: false, msg: "Invalid verification code" };
    } else if (
      user.otp_time.getTime() + otpValidateTime * 60 * 1000 <=
      new Date().getTime()
    ) {
      return { success: false, msg: "Expired verification code" };
    }

    await Users.update(
      { otp_code: null, is_email_verified: "1" },
      { where: { email } }
    );

    return { success: true, msg: "Email successfully verified" };
  } catch (error) {
    console.error("Internal Server Error", error);
    return { success: false, msg: "Failed to verify email" };
  }
};

module.exports = { verifyEmailService };
