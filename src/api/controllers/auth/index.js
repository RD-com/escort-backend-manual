const { checkAccountLock } = require("./accountLockController");
const { login } = require("./userLoginController");
const { register } = require("./userRegisterController");
const { verifyEmail, resendOTP } = require("./otp");
const { resetPassword } = require("./resetPasswordController");
const { changeEmail } = require("./changeEmailController");

module.exports = {
  checkAccountLock,
  login,
  register,
  verifyEmail,
  resendOTP,
  resetPassword,
  changeEmail,
};
