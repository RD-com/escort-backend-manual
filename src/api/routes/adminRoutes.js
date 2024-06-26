const express = require("express");
const router = express.Router();
const { admin } = require("../controllers");
const {
  requireJwt,
  requireEnableAccount,
  requireUnlockedAccount,
  requireUnSuspendedAccount,
  requireVerifiedAccount,
  requireVerifiedEmail,
} = require("../middleware/authMiddleware");
router.post("/account/verify/escort", admin.escort.verifyAccount);
router.post("/approve/document", admin.escort.approveDocument);
router.post("/approve/settings", admin.escort.approveSettings);
router.post("/approve/gallery", admin.escort.approveGallery);
router.post("/account/status/escort", admin.escort.disableAccount);
router.post("/account/status/member", admin.member.disableAccount);
router.post("/package", admin.updatePackage);

router.get("/unverified/all", admin.escort.getUnverifiedAccounts);
router.get("/unverified/document", admin.escort.getUnverifiedDocument);
router.get("/account/status/escort", admin.escort.getDisabledAccounts);
router.get("/account/status/member", admin.member.getDisabledAccounts);

router.get("/review", admin.getReview);
router.post("/review/enable", admin.enableReview);
router.get("/package", admin.getPackage);
router.get("/transaction", admin.getTransactions);

router.get("/statistics/escort", admin.getEscortCounts);
router.get("/statistics/member", admin.getMmberCounts);
router.get("/statistics/package", admin.getPackages);
router.get("/statistics/profile-click-count", admin.profileClicks);

router.post("/sponsor-ads", admin.createSponsorAd);
router.get("/sponsor-ads", admin.viewSponsorAd);

module.exports = router;
