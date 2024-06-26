const { DayLocalization } = require("../../../models");
const { Op } = require("sequelize");

async function day(code) {
  try {
    const data = await DayLocalization.findAll({
      where: {
        language_code: code,
        combination_id: {
          [Op.lt]: 8,
        },
      },
      attributes: ["combination_id", "content"],
    });
    if (data.length === 0) {
      console.error("Not found any day in that language code");
      throw new Error("Not found any day in that language code");
    }
    const dayDataArray = data.map((record) => ({
      value: record.combination_id,
      label: record.content,
    }));
    return dayDataArray;
  } catch (error) {
    console.error("Error processing the data:", error);
    throw new Error("Get day data error");
  }
}

module.exports = { day };
