const { EscortAboutMeLocalization } = require("../../../models");

const getAboutMe = async (req, res) => {
  try {
    const userId = req.user.id;

    try {
      const data = await EscortAboutMeLocalization.findAll({
        where: { user_id: userId },
        attributes: ["language_code", "content"],
      });

      const transformedData = {};
      data.forEach((entry) => {
        transformedData[entry.language_code] = entry.content;
      });

      return res.status(200).json({ success: true, defaults: transformedData });
    } catch (error) {
      console.error("Error processing the data:", error);
      res
        .status(400)
        .json({ success: false, msg: "Get escort about me error" });
    }
  } catch (error) {
    console.error("Error processing the data:", error);
    res.status(500).json({ success: false, msg: "Get about me data error" });
  }
};

module.exports = { getAboutMe };
