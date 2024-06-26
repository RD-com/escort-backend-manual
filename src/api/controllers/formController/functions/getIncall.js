const { IncallLocalization } = require("../../../models");

async function incall(code) {
  try {
    const data = await IncallLocalization.findAll({
      where: { language_code: code },
      attributes: ["combination_id", "content"],
    });
    if (data.length == 0) {
      console.error("Not found any incall in that language code");
      throw new Error("Not found any incall in that language code");
    }
    const incallDataArray = data.map((record) => ({
      value: record.combination_id,
      label: record.content,
    }));
    return incallDataArray;
  } catch (error) {
    console.error("Error processing the data:", error);
    throw new Error("Get incall data error");
  }
}

module.exports = { incall };
