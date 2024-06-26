const { ContactInstructionLocalization } = require("../../models");
const { getUniqueCombinationIds } = require("./localizationController");

async function getUniqueContactInstructionCombinationIds() {
  return getUniqueCombinationIds(ContactInstructionLocalization);
}

module.exports = { getUniqueContactInstructionCombinationIds };
