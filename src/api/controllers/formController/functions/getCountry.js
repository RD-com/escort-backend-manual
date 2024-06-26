const { Country } = require("../../../models");

async function country() {
  try {
    const data = await Country.findAll({
      attributes: ["short_code", "content"],
    });
    if (data.length == 0) {
      console.error("Not found any country in that language code");
      throw new Error("Not found any country in that language code");
    }
    const countryDataArray = data.map((record) => ({
      value: record.short_code,
      label: record.content,
    }));
    return countryDataArray;
  } catch (error) {
    console.error("Error processing the data:", error);
    throw new Error("Get country data error");
  }
}

module.exports = { country };
