const { BreastLocalization } = require("../../../models");

async function breast(code) {
  try {
    const data = await BreastLocalization.findAll({
      where: { language_code: code },
      attributes: ["combination_id", "content"],
    });
    if (data.length == 0) {
      console.error("Not found any breast data in that language code");
      throw new Error("Not found any breast data in that language code");
    }
    const breastDataArray = data.map((record) => ({
      value: record.combination_id,
      label: record.content,
    }));
    return breastDataArray;
  } catch (error) {
    console.error("Error processing the data:", error);
    throw new Error("Get breast data error");
  }
}

module.exports = { breast };
