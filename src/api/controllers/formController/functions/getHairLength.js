const { HairLengthLocalization } = require("../../../models");

async function hairLength(code) {
  try {
    const data = await HairLengthLocalization.findAll({
      where: { language_code: code },
      attributes: ["combination_id", "content"],
    });
    if (data.length == 0) {
      console.error("Not found any hair length in that language code");
      throw new Error("Not found any hair length in that language code");
    }
    const hairLengthDataArray = data.map((record) => ({
      value: record.combination_id,
      label: record.content,
    }));
    return hairLengthDataArray;
  } catch (error) {
    console.error("Error processing the data:", error);
    throw new Error("Get hair length data error");
  }
}

module.exports = { hairLength };
