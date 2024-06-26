const { DayLocalization } = require("../../models");
const { getUniqueCombinationIds } = require("./localizationController");

async function getUniqueDayCombinationIds() {
  return getUniqueCombinationIds(DayLocalization);
}

module.exports = { getUniqueDayCombinationIds };
