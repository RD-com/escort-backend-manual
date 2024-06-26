const { EscortSocialContact } = require("../../../models");
const Joi = require("joi");
const { sanitize } = require("../../../services");

/*
  {
      "socialContact": {
        "1": "lorem",
        "2": "lorem",
        "3": "lorem",
        "4": "lorem"
      }
  }
*/

const SocialContactSchema = Joi.object({
  socialContact: Joi.object()
    .pattern(
      Joi.string().valid("1", "2", "3", "4").required(),
      Joi.string().allow("").required()
    )
    .required(),
});

const createSocialContact = async (req, res) => {
  try {
    const { error } = SocialContactSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { socialContact } = req.body;
    const userId = req.user.id;

    for (const type of Object.keys(socialContact)) {
      const content = socialContact[type];
      let sanitizedContent;

      if (content !== undefined) {
        sanitizedContent =
          content !== "" ? sanitize.sanitizeInput(content) : "";
      } else {
        sanitizedContent = "";
      }

      const existingContact = await EscortSocialContact.findOne({
        where: {
          user_id: userId,
          type,
        },
      });

      if (existingContact) {
        await existingContact.update({ content: sanitizedContent });
      } else {
        await EscortSocialContact.create({
          user_id: userId,
          type,
          content: sanitizedContent,
        });
      }
    }

    return res.status(200).json({
      success: true,
      msg: "Social Contact data added successfully",
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Escort Social Contact data error" });
  }
};

module.exports = { createSocialContact };
