const { EyeColorLocalization } = require("../../models");
const { getUniqueCombinationIds } = require("./localizationController");

async function getUniqueEyeColorCombinationIds() {
  return getUniqueCombinationIds(EyeColorLocalization);
}

module.exports = { getUniqueEyeColorCombinationIds };
