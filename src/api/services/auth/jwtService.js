require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");
const {
  checkAccountLock,
} = require("../../controllers/auth/accountLockController");

const createTokens = (user) => {
  const expiresIn = "1h";

  const accessToken = sign(
    {
      userId: user.id,
      email: user.email,
      username: user.username,
      proPic: user.pro_pic,
      isEmailVerified: user.is_email_verified,
      isAccountVerified: user.is_account_verified,
      isAccountDisabled: user.is_disabled,
      isAccountSuspended: user.is_suspended,
      currentStep: user.current_step,
      accountType: user.account_type_id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn,
    }
  );

  return accessToken;
};

const validateTokenMiddleware = async (req, res, next) => {
  const accessToken = req.headers["accesstoken"];

  // if (!accessToken)
  //   return res.status(401).json({
  //     success: false,
  //     msg: "User not Authenticated!",
  //     redirect: "/escort/login",
  //   });

  try {
    // const validToken = verify(accessToken, process.env.JWT_SECRET);
    // if (!validToken) {
    //   return res.status(401).json({
    //     success: false,
    //     msg: "User not Authenticated!",
    //     redirect: "/escort/login",
    //   });
    // }

    // req.authenticated = true;

    // if (req.checkAccountLock && (await checkAccountLock(validToken.userId))) {
    //   return res.status(401).json({
    //     success: false,
    //     msg: "Account Temporarily Locked!",
    //     redirect: "/account-locked",
    //   });
    // }

    // if (req.checkEmailVerified && validToken.isEmailVerified == 0) {
    //   return res.status(401).json({
    //     success: false,
    //     msg: "Email Not Verified!",
    //     redirect: "/email-verify",
    //   });
    // }

    // if (req.checkAccountVerified && validToken.isAccountVerified == 0) {
    //   return res.status(401).json({
    //     success: false,
    //     msg: "Account Not Verified!",
    //     redirect: "/pending-approval",
    //   });
    // }

    // if (req.checkAccountDisabled && validToken.isAccountDisabled == 1) {
    //   return res.status(401).json({
    //     success: false,
    //     msg: "Account Disabled!",
    //     redirect: "/account-disabled",
    //   });
    // }

    // if (req.checkAccountSuspended && validToken.isAccountSuspended == 1) {
    //   return res.status(401).json({
    //     success: false,
    //     msg: "Account Suspended!",
    //     redirect: "/account-suspended",
    //   });
    // }

    // if (req.checkIsMember && validToken.accountType != 1) {
    //   return res.status(401).json({
    //     success: false,
    //     msg: "User havent access!",
    //     redirect: "/login",
    //   });
    // }

    // if (req.checkIsEscort && validToken.accountType != 2) {
    //   return res.status(401).json({
    //     success: false,
    //     msg: "User havent access!",
    //     redirect: "/login",
    //   });
    // }

    // if (req.checkIsAdmin && validToken.accountType != 3) {
    //   return res.status(401).json({
    //     success: false,
    //     msg: "User havent access!",
    //     redirect: "/login",
    //   });
    // }

    // req.userId = validToken.userId;
    req.userId = 1;
    // req.currentStep = validToken.currentStep;

    return next();
  } catch (error) {
    console.error("Error in validateToken:", error);
    return res
      .status(400)
      .json({ success: false, msg: "Invalid token", redirect: "/login" });
  }
};

const validateToken = validateTokenMiddleware;
const validateTokenAndAccountLock = (req, res, next) => {
  req.checkAccountLock = true;
  return validateTokenMiddleware(req, res, next);
};
const validateTokenAndEmailVerified = (req, res, next) => {
  req.checkEmailVerified = true;
  return validateTokenMiddleware(req, res, next);
};
const validateTokenAndAccountVerified = (req, res, next) => {
  req.checkAccountVerified = true;
  return validateTokenMiddleware(req, res, next);
};
const validateTokenAndAccountDisabled = (req, res, next) => {
  req.checkAccountDisabled = true;
  return validateTokenMiddleware(req, res, next);
};

const validateTokenAndAccountSuspended = (req, res, next) => {
  req.checkAccountSuspended = true;
  return validateTokenMiddleware(req, res, next);
};

const validateMember = (req, res, next) => {
  req.checkIsMember = true;
  return validateTokenMiddleware(req, res, next);
};

const validateEscort = (req, res, next) => {
  req.checkIsEscort = true;
  return validateTokenMiddleware(req, res, next);
};

const validateAdmin = (req, res, next) => {
  req.checkIsAdmin = true;
  return validateTokenMiddleware(req, res, next);
};

module.exports = {
  createTokens,
  validateToken,
  validateTokenAndAccountLock,
  validateTokenAndEmailVerified,
  validateTokenAndAccountVerified,
  validateTokenAndAccountDisabled,
  validateTokenAndAccountSuspended,
  validateMember,
  validateEscort,
  validateAdmin,
};
