const { EscortAdditionalInformation } = require("../../../models");
const Joi = require("joi");

const getAditionalInfo = async (req, res) => {
  try {
    const userId = req.user.id;
    try {
      const data = await EscortAdditionalInformation.findOne({
        where: { user_id: userId },
        attributes: [
          ["is_smoking", "isSmoking"],
          ["is_drinking", "isDrinking"],
          ["is_tatoos", "isTatoos"],
          ["is_piercing", "isPiercing"],
          ["special_characteristics", "specialCharacteristics"],
        ],
      });

      return res.status(200).json({ success: true, defaults: data });
    } catch (error) {
      console.error("Error processing the data:", error);
      res
        .status(400)
        .json({ success: false, msg: "Get escort aditional info error" });
    }
  } catch (error) {
    console.error("Error processing the data:", error);
    res
      .status(500)
      .json({ success: false, msg: "Get aditional info data error" });
  }
};

module.exports = { getAditionalInfo };
