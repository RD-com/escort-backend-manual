const { SexualOrientationLocalization } = require("../../models");
const { getUniqueCombinationIds } = require("./localizationController");

async function getUniqueSexualOrientationCombinationIds() {
  return getUniqueCombinationIds(SexualOrientationLocalization);
}

module.exports = { getUniqueSexualOrientationCombinationIds };
