const {
  createTokens,
  validateToken,
  validateTokenAndAccountDisabled,
  validateTokenAndAccountLock,
  validateTokenAndAccountSuspended,
  validateTokenAndAccountVerified,
  validateTokenAndEmailVerified,
} = require("./jwtService");
const { generateOTPCode } = require("./otpService");
const { verifyEmailService } = require("./emailVerificationService");
const { jwtVerifier, updateUserRole } = require("./kindeService");

module.exports = {
  createTokens,
  validateToken,
  validateTokenAndAccountDisabled,
  validateTokenAndAccountLock,
  validateTokenAndAccountSuspended,
  validateTokenAndAccountVerified,
  validateTokenAndEmailVerified,
  generateOTPCode,
  verifyEmailService,
  jwtVerifier,
  updateUserRole,
};
