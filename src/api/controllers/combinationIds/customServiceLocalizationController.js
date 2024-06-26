const { CustomServiceLocalization } = require("../../models");
const { getUniqueCombinationIds } = require("./localizationController");

async function getUniqueCustomServiceCombinationIds() {
  return getUniqueCombinationIds(CustomServiceLocalization);
}

module.exports = { getUniqueCustomServiceCombinationIds };
