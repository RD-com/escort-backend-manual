const { PublicHairLocalization } = require("../../../models");

async function publicHair(code) {
  try {
    const data = await PublicHairLocalization.findAll({
      where: { language_code: code },
      attributes: ["combination_id", "content"],
    });
    if (data.length == 0) {
      console.error("Not found any public hair in that language code");
      throw new Error("Not found any public hair in that language code");
    }
    const publicHairDataArray = data.map((record) => ({
      value: record.combination_id,
      label: record.content,
    }));
    return publicHairDataArray;
  } catch (error) {
    console.error("Error processing the data:", error);
    throw new Error("Get public hair data error");
  }
}

module.exports = { publicHair };
