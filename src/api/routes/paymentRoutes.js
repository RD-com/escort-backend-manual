const express = require("express");
const router = express.Router();
const {
  jwtVerifier,
  requireEnableAccount,
  requireUnlockedAccount,
  requireUnSuspendedAccount,
  requireVerifiedAccount,
} = require("../middleware/authMiddleware");
const { stripe } = require("../services");
const { transaction } = require("../controllers");

router.post("/", jwtVerifier, stripe.buyCoins);

router.get("/", stripe.verifyPayment);
router.get("/transactions", jwtVerifier, transaction.get);
router.get("/wallet-balance", jwtVerifier, transaction.walletBalance);

module.exports = router;
