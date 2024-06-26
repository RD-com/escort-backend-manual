const { verifyEmail } = require("./emailVerificationController");
const { resendOTP } = require("./reSendOtp");

module.exports = { verifyEmail, resendOTP };
