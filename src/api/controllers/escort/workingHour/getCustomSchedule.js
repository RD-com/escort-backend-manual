const { EscortWorkingHour } = require("../../../models");
const { Sequelize } = require("sequelize");

const getCustomSchedule = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await EscortWorkingHour.findAll({
      where: {
        user_id: userId,
        combination_id: {
          [Sequelize.Op.not]: 8,
        },
      },
      attributes: [
        "combination_id",
        [Sequelize.fn("to_char", Sequelize.col("from"), "HH24:MI"), "from"],
        [Sequelize.fn("to_char", Sequelize.col("to"), "HH24:MI"), "to"],
        "is_night_escort",
      ],
    });

    data.sort((a, b) => a.combination_id - b.combination_id);

    const formattedData = {
      success: true,
      defaults: data.map((item) => {
        const formattedItem = {
          combinationId: item.combination_id,
          isNightEscort: item.is_night_escort,
        };

        if (item.from !== null && item.to !== null) {
          formattedItem.from = item.from;
          formattedItem.to = item.to;
        }

        return formattedItem;
      }),
    };

    if (data.length === 0) {
      const combinations = Array.from({ length: 7 }, (_, index) => ({
        combinationId: index + 1,
        isNightEscort: false,
      }));

      return res.status(200).json({ success: true, defaults: combinations });
    }

    return res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error processing the data:", error);
    if (error instanceof Sequelize.ValidationError) {
      return res.status(400).json({ success: false, msg: "Validation error" });
    }
    return res
      .status(500)
      .json({ success: false, msg: "Internal server error" });
  }
};

module.exports = { getCustomSchedule };
