const express = require("express");
const router = express.Router();

const { escort } = require("../controllers");
const {
  jwtVerifier,
  requireJwt,
  requireEnableAccount,
  requireUnlockedAccount,
  requireUnSuspendedAccount,
  requireVerifiedAccount,
  requireVerifiedEmail,
} = require("../middleware/authMiddleware");
const { verification } = require("../services/emailService");

router.post("/physicalFeature", jwtVerifier, escort.createPhysicalFeature);
router.post("/additionalInfo", jwtVerifier, escort.createAdditionalInfo);
router.post("/aboutme", jwtVerifier, escort.createAboutMe);
router.post("/language", jwtVerifier, escort.createLanguage);
router.post("/workingCity", jwtVerifier, escort.createWorkingCity);
router.post("/availability", jwtVerifier, escort.createAvailability);
router.post("/basicBio", jwtVerifier, escort.createBasicBio);
router.post("/vacation", jwtVerifier, escort.createVacation);
router.post("/visibility", jwtVerifier, escort.createVisibility);
router.post("/serviceOffer", jwtVerifier, escort.createServiceOfferingCategory);
router.post("/service", jwtVerifier, escort.createService);
router.post("/customService", jwtVerifier, escort.createCustomservice);
router.post("/contactDetails", jwtVerifier, escort.createContactDetails);
router.post("/rates", jwtVerifier, escort.createRates);
router.post("/socialMedia", jwtVerifier, escort.createSocialMedia);
router.post(
  "/workingHour/customSchedule",
  jwtVerifier,
  escort.createCustomSchedule
);
router.post(
  "/workingHour/sameScheduleEveryday",
  jwtVerifier,
  escort.createSameScheduleEveryday
);
router.post(
  "/workingHour/alwaysAvailable",
  jwtVerifier,
  escort.createAlwaysAvailable
);
router.post("/profileViewCount", jwtVerifier, escort.countProfileView);
router.post("/whatsappViewCount", jwtVerifier, escort.countWhatsappNumberView);
router.post("/favouriteCount", jwtVerifier, escort.countFavourite);
router.post("/cityTour", jwtVerifier, escort.createCityTour);
router.post("/package/kingQueen", jwtVerifier, escort.buyKingQueenPackage);
router.post("/package/spotlight", jwtVerifier, escort.buySpotlightPackage);
router.post("/gallery", jwtVerifier, escort.createGallery);
router.put("/gallery", jwtVerifier, escort.updateGallery);
router.delete("/gallery", jwtVerifier, escort.deleteGallery);
router.delete("/gallery/image", jwtVerifier, escort.deleteImage);
router.post("/gallery/image", jwtVerifier, escort.addImage);
router.post("/document", jwtVerifier, escort.storeDocument);
router.post("/stories", jwtVerifier, escort.addStories);
router.post("/socialContact", jwtVerifier, escort.createSocialContact);
router.delete("/stories", jwtVerifier, escort.deleteStory);
router.get(
  "/socialContact",
  jwtVerifier,
  // requireUnlockedAccount,
  escort.getSocialContact
);
router.delete("/stories", jwtVerifier, escort.deleteStory);
router.get("/socialContact/all", escort.getAllSocialContact);
router.get(
  "/gallery/all",
  jwtVerifier,
  // requireUnlockedAccount,
  escort.getAllGalleries
);
router.get(
  "/gallery",
  jwtVerifier,
  // requireUnlockedAccount,
  escort.getGallery
);

router.get(
  "/physicalFeature",
  jwtVerifier,
  // requireUnlockedAccount,
  escort.getPhysicalFeature
);
router.get("/basicBio", jwtVerifier, escort.getBasicBio);
router.get(
  "/aditionalInfo",
  jwtVerifier,
  // requireUnlockedAccount,
  escort.getAditionalInfo
);
router.get(
  "/contactDetails",
  jwtVerifier,
  // requireUnlockedAccount,
  escort.getContactDetails
);
router.get(
  "/availability",
  jwtVerifier,
  // requireUnlockedAccount,
  escort.getAvailability
);
router.get(
  "/socialMedia",
  jwtVerifier,
  // requireUnlockedAccount,
  escort.getSocialMedia
);
router.get(
  "/aboutMe",
  jwtVerifier,
  //  requireUnlockedAccount,
  escort.getAboutMe
);
router.get(
  "/language",
  jwtVerifier,
  // requireUnlockedAccount,
  escort.getLanguage
);
router.get(
  "/rates",
  jwtVerifier,
  //  requireUnlockedAccount,
  escort.getRates
);
router.get(
  "/vacation",
  jwtVerifier,
  // requireUnlockedAccount,
  escort.getVacation
);
router.get(
  "/visibility",
  jwtVerifier,
  // requireUnlockedAccount,
  escort.getVisibility
);
router.get(
  "/checkVisibility",
  jwtVerifier,
  // requireUnlockedAccount,
  escort.checkVisibility
);
router.get(
  "/workingCity",
  jwtVerifier,
  // requireUnlockedAccount,
  escort.getWorkingCity
);
router.get(
  "/workingHour",
  jwtVerifier,
  // requireUnlockedAccount,
  escort.getCustomSchedule
);
router.get(
  "/service",
  jwtVerifier,
  //  requireUnlockedAccount,
  escort.getService
);
router.get(
  "/customService",
  jwtVerifier,
  // requireUnlockedAccount,
  escort.getCustomService
);
router.get(
  "/serviceOffer",
  jwtVerifier,
  // requireUnlockedAccount,
  escort.getServiceOffering
);
router.get(
  "/workingHour/sameScheduleEveryday",
  jwtVerifier,
  // requireUnlockedAccount,
  escort.getSameScheduleEveryday
);
router.get(
  "/workingHour/customSchedule",
  jwtVerifier,
  // requireUnlockedAccount,
  escort.getCustomSchedule
);
router.get(
  "/workingHour/alwaysAvailable",
  jwtVerifier,
  // requireUnlockedAccount,
  escort.getAlwaysAvailable
);
router.get("/cityTour", escort.getCityTour);
router.get(
  "/review",
  jwtVerifier,
  //  requireUnlockedAccount,
  escort.getReview
);
router.post(
  "/review/report",
  jwtVerifier,
  //  requireUnlockedAccount,
  escort.reportReview
);
router.get("/cards", escort.getCards);
router.get("/cards/filters", escort.getFilters);
router.get("/profile", escort.allDetails);
router.get("/profile/gallery", escort.allGalleries);
router.get("/profile/header", escort.headerDetails);
router.get("/profile/package", escort.packageDetails);
router.get("/package", escort.getPackagesData);
router.get("/profile/about-me", escort.aboutMeDetails);
router.get("/profile/bio", escort.bioDetails);
router.get("/profile/services", escort.serviceDetails);
router.get("/profile/cityTour", escort.cityTourDetails);
router.get("/profile/contact", escort.contactDetails);
router.get("/profile/languages", escort.languageDetails);
router.get("/stories/all", escort.getAvailableStories);
router.get(
  "/stories",
  jwtVerifier,
  // requireUnlockedAccount,
  escort.getStories
);
router.get("/cities", escort.getCities);

module.exports = router;
