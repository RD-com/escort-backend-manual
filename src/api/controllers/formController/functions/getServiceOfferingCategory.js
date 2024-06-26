const { ServiceOfferingCategoryLocalization } = require("../../../models");

async function serviceOfferingCategory(code) {
  try {
    const data = await ServiceOfferingCategoryLocalization.findAll({
      where: { language_code: code },
      attributes: ["combination_id", "content"],
    });
    if (data.length == 0) {
      console.error(
        "Not found any service offering category in that language code"
      );
      throw new Error(
        "Not found any service offering category in that language code"
      );
    }
    const serviceOfferingategoryDataArray = data.map((record) => ({
      value: record.combination_id,
      label: record.content,
    }));
    return serviceOfferingategoryDataArray;
  } catch (error) {
    console.error("Error processing the data:", error);
    throw new Error("Get service offering category data error");
  }
}

module.exports = { serviceOfferingCategory };
