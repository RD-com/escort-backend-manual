const { EscortSocialMedia } = require("../../../models");

const getSocialMedia = async (req, res) => {
  try {
    const userId = req.user.id;
    try {
      const data = await EscortSocialMedia.findAll({
        where: { user_id: userId },
        attributes: [
          ["social_media_id", "socialMediaId"],
          ["social_media_username", "socialMediaUsername"],
        ],
      });

      return res.status(200).json({ success: true, defaults: data });
    } catch (error) {
      console.error("Error processing the data:", error);
      res.status(400).json({
        success: false,
        msg: "Get escort social media info error",
      });
    }
  } catch (error) {
    console.error("Error processing the data:", error);
    res
      .status(500)
      .json({ success: false, msg: "Get social media info error" });
  }
};
module.exports = { getSocialMedia };
