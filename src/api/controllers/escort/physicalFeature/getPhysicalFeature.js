const { EscortPhysicalFeature } = require("../../../models");

const getPhysicalFeature = async (req, res) => {
  try {
    const userId = req.user.id;
    try {
      const data = await EscortPhysicalFeature.findOne({
        where: { user_id: userId },
        attributes: [
          ["eye_color_id", "eyeColorId"],
          ["hair_color_id", "hairColorId"],
          ["hair_length_id", "hairLengthId"],
          "height",
          "weight",
          ["dress_size", "dressSize"],
          ["shoe_size", "shoeSize"],
          "bust",
          "waist",
          "hip",
          ["cup_size", "cupSize"],
          ["breast_id", "breastId"],
          ["public_hair_id", "publicHairId"],
        ],
      });

      const nonNullValues = Object.fromEntries(
        Object.entries(data.dataValues).filter(([key, value]) => value !== null)
      );

      return res.status(200).json({ success: true, defaults: nonNullValues });
    } catch (error) {
      console.error("Error processing the data:", error);
      res.status(400).json({
        success: false,
        msg: "Get escort physical feature info error",
      });
    }
  } catch (error) {
    console.error("Error processing the data:", error);
    res
      .status(500)
      .json({ success: false, msg: "Get physical feature info error" });
  }
};
module.exports = { getPhysicalFeature };
