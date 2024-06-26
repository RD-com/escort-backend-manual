const { EscortAboutMeLocalization } = require("../../../models");
const Joi = require("joi");
const { sanitize } = require("../../../services");

/*
  {
      "userId": 1,
      "aboutMe": {
          "en": "lorem",
          "it": "lorem"
      }
  }
*/

const aboutMeSchema = Joi.object({
  aboutMe: Joi.object()
    .pattern(Joi.string().required(), Joi.string().allow("").required())
    .required(),
});

const createAboutMe = async (req, res) => {
  try {
    const { error } = aboutMeSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { aboutMe } = req.body;
    const userId = req.user.id;

    for (const languageCode in aboutMe) {
      const content = aboutMe[languageCode];
      const sanitizedContent = await sanitize.sanitizeInput(content);

      const aboutMeData = {
        user_id: userId,
        language_code: languageCode,
        content: sanitizedContent,
      };

      const existingRecord = await EscortAboutMeLocalization.findAll({
        where: {
          user_id: userId,
          language_code: languageCode,
        },
      });

      if (existingRecord && existingRecord.length) {
        await EscortAboutMeLocalization.update(aboutMeData, {
          where: {
            user_id: userId,
            language_code: languageCode,
          },
        });
      } else {
        await EscortAboutMeLocalization.create(aboutMeData);
      }
    }

    res
      .status(200)
      .json({ success: true, msg: "About Me Data received successfully" });
  } catch (error) {
    console.error("Error processing the data:", error);
    res.status(500).json({ success: false, msg: "Escort registration error" });
  }
};

module.exports = { createAboutMe };
