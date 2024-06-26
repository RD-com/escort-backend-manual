const { EscortVacation } = require("../../../models");

const getVacation = async (req, res) => {
  try {
    const userId = req.user.id;

    try {
      const data = await EscortVacation.findOne({
        where: { user_id: userId },
        attributes: ["from", "to"],
      });

      return res.status(200).json({ success: true, defaults: data });
    } catch (error) {
      console.error("Error processing the data:", error);
      res
        .status(400)
        .json({ success: false, msg: "Get escort vacation data error" });
    }
  } catch (error) {
    console.error("Error processing the data:", error);
    res
      .status(500)
      .json({ success: false, msg: "Get escort vacation data error" });
  }
};

module.exports = { getVacation };
