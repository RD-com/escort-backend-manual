const { HairLengthLocalization } = require("../../models");
const { getUniqueCombinationIds } = require("./localizationController");

async function getUniqueHairLengthCombinationIds() {
  return getUniqueCombinationIds(HairLengthLocalization);
}

module.exports = { getUniqueHairLengthCombinationIds };
