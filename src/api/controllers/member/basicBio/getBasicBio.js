const { Member } = require("../../../models");

const getBasicBio = async (req, res) => {
  try {
    const userId = req.user.id;
    try {
      const data = await Member.findOne({
        where: { user_id: userId },
        attributes: [
          "name",
          "age",
          ["country_short_code", "countryShortCode"],
          ["gender_combination_id", "genderCombinationId"],
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
        .json({ success: false, msg: "Get member basic bio error" });
    }
  } catch (error) {
    console.error("Error processing the data:", error);
    res.status(500).json({ success: false, msg: "Get basic bio data error" });
  }
};

module.exports = { getBasicBio };
