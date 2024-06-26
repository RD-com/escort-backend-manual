const express = require("express");
const { auth } = require("../controllers");
const { jwtVerifier } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication-related endpoints
 */

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with email, password, and account type.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - accountTypeId
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password (8-30 characters, at least one digit, one lowercase letter, one uppercase letter, one special character)
 *               accountTypeId:
 *                 type: integer
 *                 enum: [1, 2]
 *                 description: User's account type ID (1 for type1, 2 for type2)
 *     responses:
 *       200:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               msg: USER REGISTERED
 *       400:
 *         description: Bad request or validation error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               msg: Validation error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               msg: User Registration Error
 */

router.post("/register", jwtVerifier, auth.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     description: Log in a user with email and password.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password (8-30 characters, at least one digit, one lowercase letter, one uppercase letter, one special character)
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               accessToken: <access-token>
 *               accountType: 1
 *               msg: LOGGED IN
 *       400:
 *         description: Bad request or validation error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               msg: Validation error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               msg: Failed to login
 */
router.post("/login", auth.login);

/**
 * @swagger
 * /auth/verify-email:
 *   post:
 *     summary: Verify user's email
 *     description: Verify a user's email using the provided email and verification code.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - verificationCode
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               verificationCode:
 *                 type: integer
 *                 description: Verification code received via email
 *     responses:
 *       200:
 *         description: Email successfully verified
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               msg: Email successfully verified
 *       400:
 *         description: Bad request or validation error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               msg: Validation error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               msg: Failed to verify email
 */
router.post("/verify-email", auth.verifyEmail);
router.post("/resend-otp", auth.resendOTP);
router.post("/reset-password", auth.resetPassword);
router.post("/change-email", auth.changeEmail);

module.exports = router;
