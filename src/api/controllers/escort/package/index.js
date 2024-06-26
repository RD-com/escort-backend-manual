const { buyMainPackage } = require("./mainPackageController");
const { buyKingQueenPackage } = require("./kingQueenOfTheDayPackageController");
const { buySpotlightPackage } = require("./spotlightPackageController");
const { getPackagesData } = require("./getPackageDataController");

module.exports = {
  buyKingQueenPackage,
  buyMainPackage,
  buySpotlightPackage,
  getPackagesData,
};
