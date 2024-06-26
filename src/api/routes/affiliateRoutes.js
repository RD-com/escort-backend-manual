const express = require("express");
const router = express.Router();
const { affiliate } = require("../controllers");

const { jwtVerifier } = require("../middleware/authMiddleware");

router.get("/username", jwtVerifier, affiliate.get);
router.post("/", jwtVerifier, affiliate.referrals);
router.get("/users", jwtVerifier, affiliate.users);
router.get("/income", jwtVerifier, affiliate.income);

module.exports = router;
