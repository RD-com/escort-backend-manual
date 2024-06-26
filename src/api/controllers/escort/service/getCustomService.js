const {
  CustomServiceLocalization,
  EscortCustomService,
  Users,
} = require("../../../models");

const getCustomService = async (req, res) => {
  try {
    const userId = req.user.id;

    try {
      const data = await Users.findByPk(userId, {
        attributes: ["id"],

        include: [
          {
            model: EscortCustomService,
            attributes: [
              "rate",
              ["combination_id", "customServiceCombinationId"],
            ],
          },
        ],
      });

      return res.status(200).json({ success: true, defaults: data });
    } catch (error) {
      console.error("Error processing the data:", error);
      res
        .status(400)
        .json({ success: false, msg: "Get escort custom service data error" });
    }
  } catch (error) {
    console.error("Error processing the data:", error);
    res
      .status(500)
      .json({ success: false, msg: "Get custom service data error" });
  }
};

module.exports = { getCustomService };
