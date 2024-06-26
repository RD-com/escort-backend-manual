const { SexualOrientationLocalization } = require("../../../models");

async function sexualOrientation(code) {
  try {
    const data = await SexualOrientationLocalization.findAll({
      where: { language_code: code },
      attributes: ["combination_id", "content"],
    });
    if (data.length == 0) {
      console.error("Not found any sexual orientation in that language code");
      throw new Error("Not found any sexual orientation in that language code");
    }
    const sexualOrientationDataArray = data.map((record) => ({
      value: record.combination_id,
      label: record.content,
    }));
    return sexualOrientationDataArray;
  } catch (error) {
    console.error("Error processing the data:", error);
    throw new Error("Get sexual orientation data error");
  }
}

module.exports = { sexualOrientation };
