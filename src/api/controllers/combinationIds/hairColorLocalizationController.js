const { HairColorLocalization } = require("../../models");
const { getUniqueCombinationIds } = require("./localizationController");

async function getUniqueHairColorCombinationIds() {
  return getUniqueCombinationIds(HairColorLocalization);
}

module.exports = { getUniqueHairColorCombinationIds };
