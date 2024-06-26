const { EscortWorkingHour } = require("../../../models");
const { Sequelize } = require("sequelize");

const getSameScheduleEveryday = async (req, res) => {
  try {
    const userId = req.user.id;

    try {
      const data = await EscortWorkingHour.findAll({
        where: { user_id: userId },
        attributes: [
          "combination_id",
          [Sequelize.fn("to_char", Sequelize.col("from"), "HH24:MI"), "from"],
          [Sequelize.fn("to_char", Sequelize.col("to"), "HH24:MI"), "to"],
          "is_night_escort",
        ],
      });
      if (data === null) {
        const combinations = {
          isNightEscort: false,
        };
        return res.status(200).json({ success: true, defaults: combinations });
      }
      return res.status(200).json({ success: true, defaults: data });
    } catch (error) {
      console.error("Error processing the data:", error);
      res
        .status(400)
        .json({ success: false, msg: "Get escort working hour data error" });
    }
  } catch (error) {
    console.error("Error processing the data:", error);
    res
      .status(500)
      .json({ success: false, msg: "Get working hour data data error" });
  }
};

module.exports = { getSameScheduleEveryday };
