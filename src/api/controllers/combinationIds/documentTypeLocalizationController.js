const { EscortDocumentTypeLocalization } = require("../../models");
const { getUniqueCombinationIds } = require("./localizationController");

async function getUniqueDocumentTypeCombinationIds() {
  return getUniqueCombinationIds(EscortDocumentTypeLocalization);
}

module.exports = { getUniqueDocumentTypeCombinationIds };
