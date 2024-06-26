const { HairColorLocalization } = require("../../../models");

async function hairColor(code) {
  try {
    const data = await HairColorLocalization.findAll({
      where: { language_code: code },
      attributes: ["combination_id", "content"],
    });
    if (data.length == 0) {
      console.error("Not found any hair color in that language code");
      throw new Error("Not found any hair color in that language code");
    }
    const hairColorDataArray = data.map((record) => ({
      value: record.combination_id,
      label: record.content,
    }));
    return hairColorDataArray;
  } catch (error) {
    console.error("Error processing the data:", error);
    throw new Error("Get hair color data error");
  }
}

module.exports = { hairColor };
