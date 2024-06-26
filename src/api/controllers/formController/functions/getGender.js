const { GenderLocalization } = require("../../../models");

async function gender(code) {
  try {
    const data = await GenderLocalization.findAll({
      where: { language_code: code },
      attributes: ["combination_id", "content"],
    });
    if (data.length == 0) {
      console.error("Not found any gender in that language code");
      throw new Error("Not found any gender in that language code");
    }
    const genderDataArray = data.map((record) => ({
      value: record.combination_id,
      label: record.content,
    }));
    return genderDataArray;
  } catch (error) {
    console.error("Error processing the data:", error);
    throw new Error("Get gender data error");
  }
}

module.exports = { gender };
