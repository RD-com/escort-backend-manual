const { EyeColorLocalization } = require("../../../models");

async function eyeColor(code) {
  try {
    const data = await EyeColorLocalization.findAll({
      where: { language_code: code },
      attributes: ["combination_id", "content"],
    });
    if (data.length == 0) {
      console.error("Not found any eye color in that language code");
      throw new Error("Not found any eye color in that language code");
    }
    const eyeColorDataArray = data.map((record) => ({
      value: record.combination_id,
      label: record.content,
    }));
    return eyeColorDataArray;
  } catch (error) {
    console.error("Error processing the data:", error);
    throw new Error("Get eye color data error");
  }
}

module.exports = { eyeColor };
