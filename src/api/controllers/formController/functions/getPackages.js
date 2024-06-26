const { Package } = require("../../../models");

async function packages(code) {
  try {
    const data = await Package.findAll({
      attributes: ["name", "id"],
    });
    if (data.length == 0) {
      console.error("Not found any package data");
      throw new Error("Not found any package data");
    }
    const packageDataArray = data.map((record) => ({
      value: record.id,
      label: record.name,
    }));
    return packageDataArray;
  } catch (error) {
    console.error("Error processing the data:", error);
    throw new Error("Get package data error");
  }
}

module.exports = { packages };
