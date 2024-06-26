const { GenderLocalization } = require("../../models");
const { getUniqueCombinationIds } = require("./localizationController");

async function getUniqueGenderCombinationIds() {
  return getUniqueCombinationIds(GenderLocalization);
}

module.exports = { getUniqueGenderCombinationIds };
