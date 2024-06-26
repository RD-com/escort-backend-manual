const { Escort } = require("../../../models");
const { Op } = require("sequelize");
const { startOfMonth, endOfMonth } = require("date-fns");

const getEscortCounts = async (req, res) => {
  try {
    const allEscorts = await Escort.count();

    const startDate = startOfMonth(new Date());
    const endDate = endOfMonth(new Date());

    const newEscorts = await Escort.count({
      where: {
        created_at: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    res.status(200).json({
      success: true,
      allEscorts,
      newEscorts,
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ success: false, msg: "Get Escort Count Error" });
  }
};

module.exports = { getEscortCounts };
