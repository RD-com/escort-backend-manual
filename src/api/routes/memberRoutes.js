const express = require("express");
const router = express.Router();

const { member } = require("../controllers");
const {
  jwtVerifier,
  requireJwt,
  requireEnableAccount,
  requireUnlockedAccount,
  requireUnSuspendedAccount,
  requireVerifiedAccount,
  requireVerifiedEmail,
} = require("../middleware/authMiddleware");

router.post("/basicBio", jwtVerifier, member.createBasicBio);

router.post("/gallery/buy", jwtVerifier, member.buyPrivateGallery);

router.post("/review", jwtVerifier, member.createReview);

router.delete("/review", jwtVerifier, member.deleteReview);

router.post("/favorite", jwtVerifier, member.addFavorite);

router.get("/basicBio", jwtVerifier, member.getBasicBio);

router.get(
  "/gallery/private",
  jwtVerifier,
  // requireUnlockedAccount,
  member.getPrivateGallery
);
router.get(
  "/gallery/private/all",
  jwtVerifier,
  // requireUnlockedAccount,
  member.getAllBoughtGalleries
);
router.get(
  "/review",
  jwtVerifier,
  // requireUnlockedAccount,
  member.getReview
);
router.get(
  "/favorite",
  jwtVerifier,
  //  requireUnlockedAccount,
  member.getFavorite
);
router.get(
  "/isFavorite",
  jwtVerifier,
  //  requireUnlockedAccount,
  member.isFavorite
);

module.exports = router;
