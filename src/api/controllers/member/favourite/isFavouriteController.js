const { MemberFavorite, Users } = require("../../../models");
const Joi = require("joi");

const favoriteSchema = Joi.object({
  username: Joi.string().required(),
});

const isFavorite = async (req, res) => {
  try {
    const { error } = favoriteSchema.validate(req.query);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }
    const memberId = req.user.id;

    const favoritesData = {};

    if (memberId === undefined) {
      favoritesData.isFavorite = false;
    }

    const escort = await Users.findOne({
      where: {
        username: req.query.username,
      },
      attributes: ["id"],
    });

    if (!escort) {
      return res.status(404).json({ success: false, msg: "Escort not found" });
    }

    const favorites = await MemberFavorite.findOne({
      where: {
        member_id: memberId,
        escort_id: escort.id,
      },
    });

    if (favorites) {
      favoritesData.isFavorite = true;
    } else {
      favoritesData.isFavorite = false;
    }

    res.status(200).json({ success: true, data: favoritesData });
  } catch (error) {
    console.error("Error processing the data:", error);
    res.status(500).json({ success: false, msg: "Member favorite error" });
  }
};

module.exports = { isFavorite };
