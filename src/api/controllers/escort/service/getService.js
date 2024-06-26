const { EscortService } = require("../../../models");

const getService = async (req, res) => {
  try {
    const userId = req.user.id;

    try {
      const data = await EscortService.findAll({
        where: { user_id: userId },
        attributes: ["rate", ["combination_id", "serviceCombinationId"]],
      });

      return res.status(200).json({ success: true, defaults: data });
    } catch (error) {
      console.error("Error processing the data:", error);
      res
        .status(400)
        .json({ success: false, msg: "Get escort service data error" });
    }
  } catch (error) {
    console.error("Error processing the data:", error);
    res
      .status(500)
      .json({ success: false, msg: "Get escort service data error" });
  }
};

module.exports = { getService };
