const { BreastLocalization } = require("../../models");
const { getUniqueCombinationIds } = require("./localizationController");

async function getUniqueBreastCombinationIds() {
  return getUniqueCombinationIds(BreastLocalization);
}

module.exports = { getUniqueBreastCombinationIds };
