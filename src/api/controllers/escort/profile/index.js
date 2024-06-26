const { allDetails } = require("./getDetailsController");
const { allGalleries } = require("./getAllGalleryController");
const { headerDetails } = require("./getHeaderDetailsController");
const { packageDetails } = require("./getpackageDetailsController");
const { aboutMeDetails } = require("./getAboutMeController");
const { bioDetails } = require("./getBioController");
const { languageDetails } = require("./getLanguageController");
const { serviceDetails } = require("./getServiceController");
const { cityTourDetails } = require("./getCityTourController");
const { contactDetails } = require("./getContactController");

module.exports = {
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
};
