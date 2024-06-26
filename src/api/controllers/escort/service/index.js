const { createService } = require("./serviceController");
const { createCustomservice } = require("./customServiceController");
const {
  createServiceOfferingCategory,
} = require("./serviceOfferingController");
const { getService } = require("./getService");
const { getCustomService } = require("./getCustomService");
const { getServiceOffering } = require("./getServiceOffering");

module.exports = {
  createService,
  createCustomservice,
  createServiceOfferingCategory,
  getService,
  getCustomService,
  getServiceOffering,
};
