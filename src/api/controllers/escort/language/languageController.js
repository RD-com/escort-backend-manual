const { EscortLanguage } = require("../../../models");
const Joi = require("joi");
const { sanitize } = require("../../../services");

/*
  {
      "language": [
          {
              "languageCode": "en",
              "proficiencyId": 1
          },
          {
              "languageCode": "en",
              "proficiencyId": 2
          }
      ]
  }
*/

const languageSchema = Joi.object({
  language: Joi.array()
    .items(
      Joi.object({
        languageCode: Joi.string().required(),
        proficiencyId: Joi.number().integer().required(),
      })
    )
    .required(),
});

const createLanguage = async (req, res) => {
  try {
    const { error } = languageSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { language } = req.body;
    const userId = req.user.id;

    await EscortLanguage.destroy({
      where: {
        user_id: userId,
      },
    });

    for (const data of language) {
      const languageData = {
        user_id: userId,
        language_code: data.languageCode,
        proficiency_id: data.proficiencyId,
      };

      await EscortLanguage.upsert(languageData);
    }

    res
      .status(200)
      .json({ success: true, msg: "Language Data Created Successfully" });
  } catch (error) {
    console.error("Error processing the data:", error);
    res.status(500).json({ success: false, msg: "Escort registration error" });
  }
};

module.exports = { createLanguage };
