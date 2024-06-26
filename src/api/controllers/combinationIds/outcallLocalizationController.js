const { OutcallLocalization } = require("../../models");
const { getUniqueCombinationIds } = require("./localizationController");

async function getUniqueOutcallCombinationIds() {
  return getUniqueCombinationIds(OutcallLocalization);
}

module.exports = { getUniqueOutcallCombinationIds };
