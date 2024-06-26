const { SocialMedia, EscortSocialMedia, Users } = require("../../../models");
const Joi = require("joi");
const { sanitize } = require("../../../services");

/*
  {
      "socialMedia": [
          {
              "id":1,
              "username": "lorem"
          },
          {
              "id":2,
              "username": "lonsk"
          }
      ]
  }
*/

const SocialMediaSchema = Joi.object({
  socialMedia: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().integer().required(),
        username: Joi.string().required(),
      })
    )
    .required(),
});

const createSocialMedia = async (req, res) => {
  try {
    const { error } = SocialMediaSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { socialMedia } = req.body;
    const userId = req.user.id;

    const uniqueSocialMediaIds = await SocialMedia.findAll({
      attributes: ["id"],
    });
    const SocialMediaArray = uniqueSocialMediaIds.map((record) => record.id);

    const invalidSocialMediaIds = socialMedia
      .filter((data) => !SocialMediaArray.includes(data.id))
      .map((data) => data.id);

    if (invalidSocialMediaIds.length > 0) {
      return res.status(404).json({
        success: false,
        msg: "Social Media Ids not found",
      });
    }

    await EscortSocialMedia.destroy({
      where: {
        user_id: userId,
      },
    });
    const socialMediaDataArray = socialMedia.map((data) => {
      const sanitizedUsername = data.username
        ? sanitize.sanitizeInput(data.username)
        : undefined;

      return {
        user_id: userId,
        social_media_id: data.id,
        social_media_username: sanitizedUsername,
      };
    });

    await EscortSocialMedia.bulkCreate(socialMediaDataArray, {
      updateOnDuplicate: ["social_media_username"],
    });

    const user = await Users.update(
      { current_step: "/escort/dashboard" },
      { where: { id: userId } }
    );

    return res.status(200).json({
      success: true,
      msg: "Social Media data added successfully",
      redirect: "/escort/dashboard",
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Escort registration error" });
  }
};

module.exports = { createSocialMedia };
