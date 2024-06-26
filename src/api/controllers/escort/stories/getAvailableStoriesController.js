const {
  Users,
  EscortStories,
  Escort,
  EscortGalleryMedia,
  EscortGallery,
} = require("../../../models");
const Joi = require("joi");
const { literal } = require("sequelize");

const storiesSchema = Joi.object({
  username: Joi.string(),
});

const getAvailableStories = async (req, res) => {
  try {
    const { error } = storiesSchema.validate(req.query);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    let escortId;
    if (req.query.username) {
      const escortIdQueryOption = {
        attributes: [["id", "escortId"]],
        where: {
          username: req.query.username,
        },
      };
      const escortIdData = await Users.findOne(escortIdQueryOption);
      if (escortIdData) {
        escortId = escortIdData.dataValues.escortId;
      }
    }

    const queryOptions = {
      attributes: [
        ["user_id", "escortId"],
        [literal("MAX(url)"), "latestUrl"],
        [literal("MAX(posted_at)"), "latestPostedAt"],
      ],
      where: {
        is_deleted: "0",
        ...(escortId && { user_id: escortId }),
      },
      group: ["user_id"],
      order: [[literal("MAX(url)"), "DESC"]],
    };

    const stories = await EscortStories.findAll(queryOptions);

    if (stories.length === 0) {
      return res.status(404).json({
        success: false,
        msg: "No stories found",
      });
    }

    const formattedStories = await Promise.all(
      stories.map(async (story) => {
        const user_id = story.dataValues.escortId;
        const escort = await Escort.findOne({
          where: { user_id },
          attributes: ["name"],
        });
        const media = await EscortGallery.findAll({
          where: {
            user_id,
            type: "2",
          },
          include: [
            {
              model: EscortGalleryMedia,
              where: {
                is_deleted: "0",
              },
              attributes: ["url"],
              order: [["createdAt", "DESC"]],
            },
          ],
        });
        const userAvatar =
          media.length > 0 ? media[0].EscortGalleryMedia[0].url : null;
        const user = {
          avatar: userAvatar,
          name: escort ? escort.name : null,
        };

        const userStories = await EscortStories.findAll({
          where: {
            user_id,
            is_deleted: "0",
          },
          attributes: ["posted_at", "url"],
        });

        const formattedUserStories = userStories.map((userStory) => ({
          date: userStory.posted_at,
          image: userStory.url,
        }));

        const formattedStory = {
          user,
          stories: formattedUserStories,
        };
        if (formattedStory.user.avatar != null) {
          return formattedStory;
        }
      })
    );

    const filteredStories = formattedStories.filter(
      (story) => story !== undefined
    );

    return res
      .status(200)
      .json({ success: true, storiesData: filteredStories });
  } catch (error) {
    console.error("Error fetching stories:", error);
    return res.status(500).json({
      success: false,
      msg: "Get stories data error",
    });
  }
};

module.exports = { getAvailableStories };
