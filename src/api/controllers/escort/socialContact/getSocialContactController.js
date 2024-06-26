const { EscortSocialContact } = require("../../../models");

const getSocialContact = async (req, res) => {
  try {
    const userId = req.user.id;

    try {
      const data = await EscortSocialContact.findAll({
        where: { user_id: userId },
        attributes: ["type", "content"],
      });

      const transformedData = {};
      data.forEach((entry) => {
        transformedData[entry.type] = entry.content;
      });

      return res.status(200).json({ success: true, defaults: transformedData });
    } catch (error) {
      console.error("Error processing the data:", error);
      res.status(400).json({ success: false, msg: "Get social contact error" });
    }
  } catch (error) {
    console.error("Error processing the data:", error);
    res
      .status(500)
      .json({ success: false, msg: "Get social contact data error" });
  }
};

module.exports = { getSocialContact };
