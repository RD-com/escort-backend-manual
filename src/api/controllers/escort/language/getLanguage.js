const { EscortLanguage } = require("../../../models");

const getLanguage = async (req, res) => {
  try {
    const userId = req.user.id;

    try {
      const data = await EscortLanguage.findAll({
        where: { user_id: userId },
        attributes: [
          ["language_code", "languageCode"],
          ["proficiency_id", "proficiencyId"],
        ],
      });

      return res.status(200).json({ success: true, defaults: data });
    } catch (error) {
      console.error("Error processing the data:", error);
      res
        .status(400)
        .json({ success: false, msg: "Get escort language data error" });
    }
  } catch (error) {
    console.error("Error processing the data:", error);
    res
      .status(500)
      .json({ success: false, msg: "Get escort language data error" });
  }
};

module.exports = { getLanguage };
