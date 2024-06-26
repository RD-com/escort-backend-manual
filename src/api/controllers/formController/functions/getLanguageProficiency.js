const { LanguageProficiency } = require("../../../models");

async function languageProficiency(code) {
  try {
    const data = await LanguageProficiency.findAll({
      where: { language_code: code },
      attributes: ["combination_id", "content"],
    });
    if (data.length == 0) {
      console.error("Not found any language proficiency in that language code");
      throw new Error(
        "Not found any language proficiency in that language code"
      );
    }
    const languageProficiencyArray = data.map((record) => ({
      value: record.combination_id,
      label: record.content,
    }));
    return languageProficiencyArray;
  } catch (error) {
    console.error("Error processing the data:", error);
    throw new Error("Get language proficiency data error");
  }
}

module.exports = { languageProficiency };
