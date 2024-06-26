const { ServiceOfferingCategoryLocalization } = require("../../models");
const { getUniqueCombinationIds } = require("./localizationController");

async function getUniqueServiceOfferingCategoryCombinationIds() {
  return getUniqueCombinationIds(ServiceOfferingCategoryLocalization);
}

module.exports = { getUniqueServiceOfferingCategoryCombinationIds };
