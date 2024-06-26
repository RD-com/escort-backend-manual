const { CityLocalization } = require("../../../models");

async function city(code) {
  try {
    const data = await CityLocalization.findAll({
      where: { language_code: code },
      attributes: ["combination_id", "content"],
    });
    if (data.length == 0) {
      console.error("Not found any city in that language code");
      throw new Error("Not found any city in that language code");
    }
    const cityDataArray = data.map((record) => ({
      value: record.combination_id,
      label: record.content,
    }));
    return cityDataArray;
  } catch (error) {
    console.error("Error processing the data:", error);
    throw new Error("Get city data error");
  }
}

module.exports = { city };
