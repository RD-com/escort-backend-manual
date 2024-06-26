const { EscortWorkingHour } = require("../../../models");
const { Sequelize } = require("sequelize");

const getAlwaysAvailable = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await EscortWorkingHour.findOne({
      where: { user_id: userId, combination_id: 8 },
    });
    const isAlwaysAvailable = data ? true : false;

    return res
      .status(200)
      .json({ success: true, defaults: { isAlwaysAvailable } });
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

module.exports = { getAlwaysAvailable };
