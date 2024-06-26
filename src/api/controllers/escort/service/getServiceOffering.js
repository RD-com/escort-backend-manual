const { ServiceOfferingCategory, Escort, Users } = require("../../../models");

const getServiceOffering = async (req, res) => {
  try {
    const userId = req.user.id;

    try {
      const offeringCategoryData = await ServiceOfferingCategory.findAll({
        where: { user_id: userId },
        attributes: ["offering_category_id"],
      });
      const escortData = await Escort.findOne({
        where: { user_id: userId },
        attributes: [["sexual_orientation_id", "sexualOrientationId"]],
      });

      const offeringCategoryIds = offeringCategoryData.map(
        (instance) => instance.offering_category_id
      );
      const { sexualOrientationId } = escortData.dataValues;

      return res.status(200).json({
        success: true,
        defaults: { sexualOrientationId, offeringCategoryIds },
      });
    } catch (error) {
      console.error("Error processing the data:", error);
      res.status(400).json({
        success: false,
        msg: "Get escort service offering data error",
      });
    }
  } catch (error) {
    console.error("Error processing the data:", error);
    res
      .status(500)
      .json({ success: false, msg: "Get escort service offering data error" });
  }
};

module.exports = { getServiceOffering };
