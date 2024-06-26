const { ServiceLocalization } = require("../../models");
const { getUniqueCombinationIds } = require("./localizationController");

async function getUniqueServiceCombinationIds() {
  return getUniqueCombinationIds(ServiceLocalization);
}

module.exports = { getUniqueServiceCombinationIds };
