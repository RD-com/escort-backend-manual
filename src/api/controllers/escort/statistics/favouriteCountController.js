const { EscortStatics, Escort, MemberFavorite } = require("../../../models");

const Joi = require("joi");

const viewCountSchema = Joi.object({
  escortUserId: Joi.string().required(),
});

const countFavourite = async (req, res) => {
  try {
    const { error } = viewCountSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }
    const { escortUserId } = req.body;
    const memberUserId = req.user.id;
    try {
      if (escortUserId == memberUserId) {
        return res.status(403).json({
          success: false,
          msg: "You are not authorized to perform this action",
        });
      }
      const escort = await Escort.findOne({ where: { id: escortUserId } });
      if (!escort) {
        return res.status(404).json({
          success: false,
          msg: "Escort not found",
        });
      }
      await MemberFavorite.create({
        member_id: memberUserId,
        escort_id: escortUserId,
      });
      const countFavorites = await MemberFavorite.count({
        where: {
          escort_id: escortUserId,
        },
      });
      await EscortStatics.upsert(
        {
          user_id: escortUserId,
          favourite_count: countFavorites,
        },
        {
          updateOnDuplicate: ["favourite_count"],
        }
      );

      res.status(200).json({
        success: true,
        msg: "Escort add to favourite successfully",
      });
    } catch (error) {
      console.error("Error processing the data:", error);
      res.status(400).json({ success: false, msg: "Favourite count error" });
    }
  } catch (error) {
    console.error("Error processing the data:", error);
    res.status(500).json({ success: false, msg: "Favourite count error" });
  }
};

module.exports = { countFavourite };
