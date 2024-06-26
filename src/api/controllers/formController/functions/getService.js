const { ServiceLocalization } = require("../../../models");

async function service(code) {
  try {
    const data = await ServiceLocalization.findAll({
      where: { language_code: code },
      attributes: ["combination_id", "content"],
    });
    if (data.length == 0) {
      console.error("Not found any service in that language code");
      throw new Error("Not found any service in that language code");
    }
    const serviceDataArray = data.map((record) => ({
      value: record.combination_id,
      label: record.content,
    }));
    return serviceDataArray;
  } catch (error) {
    console.error("Error processing the data:", error);
    throw new Error("Get service data error");
  }
}

module.exports = { service };
