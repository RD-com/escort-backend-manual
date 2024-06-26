const { Member } = require("../../../models");
const { Op } = require("sequelize");
const { startOfMonth, endOfMonth } = require("date-fns");

const getMmberCounts = async (req, res) => {
  try {
    const allMembers = await Member.count();

    const startDate = startOfMonth(new Date());
    const endDate = endOfMonth(new Date());

    const newMembers = await Member.count({
      where: {
        created_at: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    res.status(200).json({
      success: true,
      allMembers,
      newMembers,
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ success: false, msg: "Get Members Count Error" });
  }
};

module.exports = { getMmberCounts };
