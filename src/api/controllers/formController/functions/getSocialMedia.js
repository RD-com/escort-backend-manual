const { SocialMedia } = require("../../../models");

async function socialMedia() {
  try {
    const data = await SocialMedia.findAll({
      attributes: ["id", "name"],
    });
    if (data.length == 0) {
      console.error("Not found any social media in that language code");
      throw new Error("Not found any social media in that language code");
    }
    const SocialMediaDataArray = data.map((record) => ({
      value: record.id,
      label: record.name,
    }));
    return SocialMediaDataArray;
  } catch (error) {
    console.error("Error processing the data:", error);
    throw new Error("Get social media data error");
  }
}

module.exports = { socialMedia };
