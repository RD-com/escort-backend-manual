const {
  createPhysicalFeature,
  getPhysicalFeature,
} = require("./physicalFeature");
const {
  createAdditionalInfo,
  getAditionalInfo,
} = require("./additionalInformation");
const { createAboutMe, getAboutMe } = require("./aboutMe");
const { createLanguage, getLanguage } = require("./language");
const {
  createWorkingCity,
  getWorkingCity,
  getCities,
} = require("./workingCity");
const { createAvailability, getAvailability } = require("./availability");
const { createBasicBio, getBasicBio } = require("./basicBio");
const { createVacation, getVacation } = require("./vacation");
const {
  createVisibility,
  getVisibility,
  checkVisibility,
} = require("./visibility");
const {
  createServiceOfferingCategory,
  createCustomservice,
  createService,
  getService,
  getCustomService,
  getServiceOffering,
} = require("./service");
const { createContactDetails, getContactDetails } = require("./contactDetails");
const { createRates, getRates } = require("./rates");
const { createSocialMedia, getSocialMedia } = require("./socialMedia");
const {
  createAlwaysAvailable,
  createSameScheduleEveryday,
  createCustomSchedule,
  getCustomSchedule,
  getSameScheduleEveryday,
  getAlwaysAvailable,
} = require("./workingHour");
const {
  countProfileView,
  countWhatsappNumberView,
  countFavourite,
} = require("./statistics");
const { createCityTour, getCityTour } = require("./cityTour");
const {
  buyKingQueenPackage,
  buyMainPackage,
  buySpotlightPackage,
  getPackagesData,
} = require("./package");
const { getReview, reportReview } = require("./review");
const {
  createGallery,
  updateGallery,
  deleteGallery,
  getAllGalleries,
  getGallery,
  deleteImage,
  addImage,
} = require("./gallery");
const { storeDocument } = require("./document");
const { getCards, getFilters } = require("./cards");
const {
  allDetails,
  allGalleries,
  headerDetails,
  packageDetails,
  aboutMeDetails,
  bioDetails,
  languageDetails,
  serviceDetails,
  cityTourDetails,
  contactDetails,
} = require("./profile");
const {
  getAvailableStories,
  getStories,
  addStories,
  deleteStory,
} = require("./stories");
const {
  createSocialContact,
  getSocialContact,
  getAllSocialContact,
} = require("./socialContact");

module.exports = {
  createPhysicalFeature,
  createAdditionalInfo,
  createAboutMe,
  createLanguage,
  createWorkingCity,
  createAvailability,
  createBasicBio,
  createVacation,
  createVisibility,
  createServiceOfferingCategory,
  createService,
  createCustomservice,
  createContactDetails,
  createRates,
  createSocialMedia,
  createAlwaysAvailable,
  createSameScheduleEveryday,
  createCustomSchedule,
  getBasicBio,
  getPhysicalFeature,
  getAditionalInfo,
  getContactDetails,
  getAvailability,
  getSocialMedia,
  getAboutMe,
  getLanguage,
  getWorkingCity,
  getVacation,
  getVisibility,
  getRates,
  getCustomSchedule,
  getService,
  getServiceOffering,
  getCustomService,
  getSameScheduleEveryday,
  getAlwaysAvailable,
  checkVisibility,
  countProfileView,
  countWhatsappNumberView,
  countFavourite,
  createCityTour,
  getCityTour,
  buyKingQueenPackage,
  buyMainPackage,
  buySpotlightPackage,
  getPackagesData,
  getReview,
  reportReview,
  createGallery,
  updateGallery,
  deleteGallery,
  getAllGalleries,
  getGallery,
  deleteImage,
  addImage,
  storeDocument,
  getCards,
  getFilters,
  allDetails,
  getAvailableStories,
  getStories,
  allGalleries,
  headerDetails,
  packageDetails,
  aboutMeDetails,
  languageDetails,
  addStories,
  getCities,
  bioDetails,
  serviceDetails,
  cityTourDetails,
  contactDetails,
  deleteStory,
  createSocialContact,
  getSocialContact,
  getAllSocialContact,
};
