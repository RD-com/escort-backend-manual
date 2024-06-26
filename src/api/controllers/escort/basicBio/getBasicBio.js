const { Escort } = require("../../../models");

const getBasicBio = async (req, res) => {
  try {
    const userId = req.user.id;

    try {
      const data = await Escort.findOne({
        where: { user_id: userId },
        attributes: [
          "name",
          "age",
          ["gender_combination_id", "genderCombinationId"],
          ["country_short_code", "countryShortCode"],
          "city",
          ["nationality_id", "nationalityId"],
        ],
      });

      return res.status(200).json({
        success: true,
        defaults: data,
        csrfToken: res.locals.csrfToken,
      });
    } catch (error) {
      console.error("Error processing the data:", error);
      res
        .status(400)
        .json({ success: false, msg: "Get escort basic bio error" });
    }
  } catch (error) {
    console.error("Error processing the data:", error);
    res.status(500).json({ success: false, msg: "Get basic bio data error" });
  }
};

module.exports = { getBasicBio };
