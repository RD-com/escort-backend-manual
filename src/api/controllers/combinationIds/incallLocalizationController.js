const { IncallLocalization } = require("../../models");
const { getUniqueCombinationIds } = require("./localizationController");

async function getUniqueIncallCombinationIds() {
  return getUniqueCombinationIds(IncallLocalization);
}

module.exports = { getUniqueIncallCombinationIds };
