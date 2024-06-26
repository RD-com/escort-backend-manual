const { incallOutcallRates } = require("../../../models");

const getRates = async (req, res) => {
  try {
    const userId = req.user.id;

    try {
      const data = await incallOutcallRates.findOne({
        where: { user_id: userId },
        attributes: [
          "i_hour",
          "i_additional_hour",
          "i_dinner_date",
          "i_weekend",
          "i_overnight",
          "i_full_day",
          "o_hour",
          "o_additional_hour",
          "o_dinner_date",
          "o_weekend",
          "o_overnight",
          "o_full_day",
        ],
      });

      return res.status(200).json({ success: true, defaults: data });
    } catch (error) {
      console.error("Error processing the data:", error);
      res
        .status(400)
        .json({ success: false, msg: "Get escort rates data error" });
    }
  } catch (error) {
    console.error("Error processing the data:", error);
    res
      .status(500)
      .json({ success: false, msg: "Get escort rates data error" });
  }
};

module.exports = { getRates };
