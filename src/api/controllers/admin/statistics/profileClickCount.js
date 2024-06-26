const { EscortStatics, Users } = require("../../../models");

const profileClicks = async (req, res) => {
  try {
    const profileClicks = await EscortStatics.findAll({
      attributes: ["user_id", "profile_view_count"],
    });

    const userDetailsPromises = profileClicks.map(async (click) => {
      const userDetails = await Users.findByPk(click.user_id);
      return {
        userId: click.user_id,
        count: click.profile_view_count,
        email: userDetails.dataValues.email,
        username: userDetails.dataValues.username,
      };
    });

    const profileViewCounts = await Promise.all(userDetailsPromises);

    res.status(200).json({
      success: true,
      profileViewCounts,
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res
      .status(500)
      .json({ success: false, msg: "Get Profile Click Count Error" });
  }
};

module.exports = { profileClicks };
