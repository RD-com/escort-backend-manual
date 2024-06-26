const express = require("express");
const router = express.Router();
const { appointment } = require("../controllers");
const {
  jwtVerifier,
  requireJwt,
  requireEnableAccount,
  requireUnlockedAccount,
  requireUnSuspendedAccount,
  requireVerifiedAccount,
  requireVerifiedEmail,
} = require("../middleware/authMiddleware");

router.post("/create", jwtVerifier, appointment.create);
router.get(
  "/",
  jwtVerifier,
  // requireUnlockedAccount,
  appointment.get
);
router.delete("/", jwtVerifier, appointment.del);
router.post("/approval", jwtVerifier, appointment.approval);

module.exports = router;
