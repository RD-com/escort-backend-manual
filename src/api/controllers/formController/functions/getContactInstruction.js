const { ContactInstructionLocalization } = require("../../../models");

async function contactInstruction(code) {
  try {
    const data = await ContactInstructionLocalization.findAll({
      where: { language_code: code },
      attributes: ["combination_id", "content"],
    });
    if (data.length == 0) {
      console.error("Not found any contact instruction in that language code");
      throw new Error(
        "Not found any contact instruction in that language code"
      );
    }
    const contactInstructionDataArray = data.map((record) => ({
      value: record.combination_id,
      label: record.content,
    }));
    return contactInstructionDataArray;
  } catch (error) {
    console.error("Error processing the data:", error);
    throw new Error("Get contact instruction data error");
  }
}

module.exports = { contactInstruction };
