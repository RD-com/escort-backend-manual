const { CityLocalization } = require("../../models");
const { getUniqueCombinationIds } = require("./localizationController");

async function getUniqueCityCombinationIds() {
  return getUniqueCombinationIds(CityLocalization);
}

module.exports = { getUniqueCityCombinationIds };
