const { Language } = require("../../../models");

async function language() {
  try {
    const data = await Language.findAll({
      attributes: ["code", "name"],
    });
    if (data.length == 0) {
      console.error("Not found any language in that language code");
      throw new Error("Not found any language in that language code");
    }
    const languageDataArray = data.map((record) => ({
      value: record.code,
      label: record.name,
    }));
    return languageDataArray;
  } catch (error) {
    console.error("Error processing the data:", error);
    throw new Error("Get language data error");
  }
}

module.exports = { language };
