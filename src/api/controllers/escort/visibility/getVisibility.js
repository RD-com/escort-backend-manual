const {
  EscortAccountVisibilityGenderLimit,
  EscortAccountVisibilityCountryLimit,
  EscortAccountVisibilityAgeLimit,
  Users,
} = require("../../../models");

const getVisibility = async (req, res) => {
  try {
    const userId = req.user.id;

    try {
      const data = await Users.findByPk(userId, {
        attributes: ["id"],

        include: [
          {
            model: EscortAccountVisibilityGenderLimit,
            attributes: [["combination_id", "combinationId"]],
          },
          {
            model: EscortAccountVisibilityCountryLimit,
            attributes: [["country_short_code", "countryShortCode"]],
          },
          {
            model: EscortAccountVisibilityAgeLimit,
            attributes: [
              ["min_age", "minAge"],
              ["max_age", "maxAge"],
            ],
          },
        ],
      });

      return res.status(200).json({ success: true, defaults: data });
    } catch (error) {
      console.error("Error processing the data:", error);
      res
        .status(400)
        .json({ success: false, msg: "Get escort visibility data error" });
    }
  } catch (error) {
    console.error("Error processing the data:", error);
    res.status(500).json({ success: false, msg: "Get visibility data error" });
  }
};

module.exports = { getVisibility };
