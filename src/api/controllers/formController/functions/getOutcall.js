const { OutcallLocalization } = require("../../../models");

async function outcall(code) {
  try {
    const data = await OutcallLocalization.findAll({
      where: { language_code: code },
      attributes: ["combination_id", "content"],
    });
    if (data.length == 0) {
      console.error("Not found any outcall in that language code");
      throw new Error("Not found any outcall in that language code");
    }
    const outcallDataArray = data.map((record) => ({
      value: record.combination_id,
      label: record.content,
    }));
    return outcallDataArray;
  } catch (error) {
    console.error("Error processing the data:", error);
    throw new Error("Get outcall data error");
  }
}

module.exports = { outcall };
