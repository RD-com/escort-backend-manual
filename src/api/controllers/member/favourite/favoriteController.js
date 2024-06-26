const { Member, Users, MemberFavorite, Escort } = require("../../../models");
const Joi = require("joi");

const favoriteSchema = Joi.object({
  username: Joi.string().required(),
});

const addFavorite = async (req, res) => {
  try {
    const { error } = favoriteSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { username } = req.body;

    const memberId = req.user.id;

    const member = await Member.findOne({
      where: {
        user_id: memberId,
      },
    });

    if (!member) {
      return res
        .status(403)
        .json({ success: false, msg: "Only member can add favorite" });
    }

    const escort = await Users.findOne({
      where: {
        username,
      },
      attributes: ["id"],
      include: [
        {
          model: Escort,
          required: true,
        },
      ],
    });

    if (!escort) {
      return res.status(404).json({ success: false, msg: "Escort not found" });
    }

    const escortId = escort.id;

    const [favorite, created] = await MemberFavorite.findOrCreate({
      where: {
        member_id: memberId,
        escort_id: escortId,
      },
      defaults: {
        member_id: memberId,
        escort_id: escortId,
      },
    });

    if (!created) {
      await favorite.destroy();
      return res.status(200).json({
        success: true,
        msg: "Removed form favorite successfully.",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Added to favorite successfully.",
    });
  } catch (error) {
    console.error("Error processing the data:", error);
    res.status(500).json({ success: false, msg: "Member favorite error" });
  }
};

module.exports = { addFavorite };
