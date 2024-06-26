const express = require("express");
const {
  jwtVerifier,
  requireJwt,
  requireEnableAccount,
  requireUnlockedAccount,
  requireUnSuspendedAccount,
  requireVerifiedAccount,
  requireVerifiedEmail,
} = require("../middleware/authMiddleware");
const { profile } = require("../controllers");

const router = express.Router();

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get user profile
 *     tags:
 *       - Profile
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               message: profile
 */
router.get(
  "/",
  jwtVerifier,
  requireEnableAccount,
  requireUnlockedAccount,
  requireUnSuspendedAccount,
  requireVerifiedAccount,
  requireVerifiedEmail,
  profile.view
);

module.exports = router;
