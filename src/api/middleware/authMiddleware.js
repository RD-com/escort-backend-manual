const { auth } = require("../services");

const requireJwt = auth.validateToken;
const requireEnableAccount = auth.validateTokenAndAccountDisabled;
const requireUnlockedAccount = auth.validateTokenAndAccountLock;
const requireUnSuspendedAccount = auth.validateTokenAndAccountSuspended;
const requireVerifiedAccount = auth.validateTokenAndAccountVerified;
const requireVerifiedEmail = auth.validateTokenAndEmailVerified;
const jwtVerifier = auth.jwtVerifier;

module.exports = {
  requireJwt,
  requireEnableAccount,
  requireUnlockedAccount,
  requireUnSuspendedAccount,
  requireVerifiedAccount,
  requireVerifiedEmail,
  jwtVerifier,
};
