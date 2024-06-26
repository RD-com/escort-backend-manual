const { createCustomSchedule } = require("./customScheduleController");
const {
  createSameScheduleEveryday,
} = require("./SameScheduleEverydayController");
const { createAlwaysAvailable } = require("./alwaysAvailableController");
const { getCustomSchedule } = require("./getCustomSchedule");
const { getSameScheduleEveryday } = require("./getSameScheduleEveryday");
const { getAlwaysAvailable } = require("./getAlwaysAvailable");

module.exports = {
  createCustomSchedule,
  createSameScheduleEveryday,
  createAlwaysAvailable,
  getCustomSchedule,
  getSameScheduleEveryday,
  getAlwaysAvailable,
};
