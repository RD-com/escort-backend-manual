const { EscortAdditionalInformation } = require("../../../models");
const Joi = require("joi");
const { sanitize } = require("../../../services");

const additionalInfoSchema = Joi.object({
  isSmoking: Joi.number().integer(),
  isDrinking: Joi.number().integer(),
  isTatoos: Joi.number().integer(),
  isPiercing: Joi.number().integer(),
  specialCharacteristics: Joi.string().allow("").allow(null),
});

const createAdditionalInfo = async (req, res) => {
  try {
    const { error } = additionalInfoSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const {
      isSmoking,
      isDrinking,
      isTatoos,
      isPiercing,
      specialCharacteristics = "",
    } = req.body;

    const userId = req.user.id;

    const sanitizedSpecialCharacteristics =
      specialCharacteristics !== null
        ? sanitize.sanitizeInput(specialCharacteristics || "")
        : "";

    const additionalInfoData = {
      user_id: userId,
      is_smoking: isSmoking,
      is_drinking: isDrinking,
      is_tatoos: isTatoos,
      is_piercing: isPiercing,
      special_characteristics: sanitizedSpecialCharacteristics,
    };

    await EscortAdditionalInformation.upsert(additionalInfoData);

    return res.status(201).json({
      success: true,
      msg: "Additional infomation created successfully",
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Escort registration error" });
  }
};

module.exports = { createAdditionalInfo };
