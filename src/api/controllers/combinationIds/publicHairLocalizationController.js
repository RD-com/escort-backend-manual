const { PublicHairLocalization } = require("../../models");
const { getUniqueCombinationIds } = require("./localizationController");

async function getUniquePublicHairCombinationIds() {
  return getUniqueCombinationIds(PublicHairLocalization);
}

module.exports = { getUniquePublicHairCombinationIds };
