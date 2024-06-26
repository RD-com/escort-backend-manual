const {
  CustomServiceLocalization,
  EscortCustomService,
} = require("../../../models");
const Joi = require("joi");
const {
  getUniqueCustomServiceCombinationIds,
} = require("../../combinationIds");

const { sanitize } = require("../../../services");

/*
  {
      "customService": [
          {
              "languageCode": "en",
              "content": "lorem",
              "rate":100
          },
          {
              "languageCode": "en",
              "content": "lorem",
              "rate":200
          }
      ]
  }
*/

const customServiceSchema = Joi.object({
  customService: Joi.array()
    .items(
      Joi.object({
        languageCode: Joi.string().required(),
        content: Joi.string().required(),
        rate: Joi.number().integer().required(),
      })
    )
    .required(),
});

const createCustomservice = async (req, res) => {
  try {
    const { error } = customServiceSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { customService } = req.body;
    const userId = req.user.id;

    const customServiceCombinationIdArray =
      await getUniqueCustomServiceCombinationIds();

    const maxId = Math.max(...customServiceCombinationIdArray);
    const newCustomServiceCombinationId = maxId >= 0 ? maxId + 1 : 1;

    for (const data of customService) {
      const sanitizedContent = data.content
        ? sanitize.sanitizeInput(data.content)
        : undefined;

      const customServiceLocalizationData = {
        user_id: userId,
        combination_id: newCustomServiceCombinationId,
        language_code: data.languageCode,
        content: sanitizedContent,
      };

      await CustomServiceLocalization.upsert(customServiceLocalizationData);
    }

    const customServiceData = {
      user_id: userId,
      combination_id: newCustomServiceCombinationId,
    };
    await EscortCustomService.upsert(customServiceData),
      res.status(200).json({
        success: true,
        msg: "Custom Service Data received successfully",
      });
  } catch (error) {
    console.error("Error processing the data:", error);
    res.status(500).json({ success: false, msg: "Escort registration error" });
  }
};

module.exports = { createCustomservice };
