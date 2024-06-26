const { Nationality } = require("../../../models");

async function nationality() {
  try {
    const data = await Nationality.findAll({
      attributes: ["id", "name"],
    });
    if (data.length == 0) {
      console.error("Not found any nationality in that language code");
      throw new Error("Not found any nationality in that language code");
    }
    const nationalityDataArray = data.map((record) => ({
      value: record.id,
      label: record.name,
    }));
    return nationalityDataArray;
  } catch (error) {
    console.error("Error processing the data:", error);
    throw new Error("Get nationality data error");
  }
}

module.exports = { nationality };
