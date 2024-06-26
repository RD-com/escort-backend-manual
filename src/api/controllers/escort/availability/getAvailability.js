const { EscortAvailability } = require("../../../models");

const getAvailability = async (req, res) => {
  try {
    const userId = req.user.id;

    try {
      const data = await EscortAvailability.findOne({
        where: { user_id: userId },
        attributes: [
          ["incall_combination_id", "incallCombinationId"],
          ["outcall_combination_id", "outcallCombinationId"],
        ],
      });

      const defaults = {};
      if (data?.dataValues.incallCombinationId !== null) {
        defaults.incallCombinationId = parseInt(
          data.dataValues.incallCombinationId,
          10
        );
      }
      if (data?.dataValues.outcallCombinationId !== null) {
        defaults.outcallCombinationId = parseInt(
          data.dataValues.outcallCombinationId,
          10
        );
      }

      const responseData = {
        success: true,
        defaults: defaults,
      };

      return res.status(200).json(responseData);
    } catch (error) {
      console.error("Error processing the data:", error);
      res
        .status(400)
        .json({ success: false, msg: "Get escort availability details error" });
    }
  } catch (error) {
    console.error("Error processing the data:", error);
    res
      .status(500)
      .json({ success: false, msg: "Get availability details error" });
  }
};

module.exports = { getAvailability };
