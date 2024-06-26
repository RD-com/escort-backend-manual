const { EscortWorkingCity } = require("../../../models");

const getWorkingCity = async (req, res) => {
  try {
    const userId = req.user.id;

    try {
      const data = await EscortWorkingCity.findAll({
        where: { user_id: userId },
        attributes: ["combination_id"],
      });
      const cityArray = data.map((instance) => instance.combination_id);

      return res.status(200).json({ success: true, defaults: cityArray });
    } catch (error) {
      console.error("Error processing the data:", error);
      res
        .status(400)
        .json({ success: false, msg: "Get escort working city data error" });
    }
  } catch (error) {
    console.error("Error processing the data:", error);
    res
      .status(500)
      .json({ success: false, msg: "Get escort working city data error" });
  }
};

module.exports = { getWorkingCity };
