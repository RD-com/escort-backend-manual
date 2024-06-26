const { Language } = require("../models");

const getLanguage = async (req, res) => {
  try {
    try {
      const data = await Language.findAll({
        attributes: [
          ["code", "value"],
          ["name", "label"],
        ],
      });

      return res.status(200).json({ success: true, defaults: data });
    } catch (error) {
      console.error("Error processing the data:", error);
      res.status(400).json({ success: false, msg: "Get language data error" });
    }
  } catch (error) {
    console.error("Error processing the data:", error);
    res.status(500).json({ success: false, msg: "Get language data error" });
  }
};

module.exports = { getLanguage };
