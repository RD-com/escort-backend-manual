const {
  EscortStories,
  Escort,
  UserPackage,
  PackageFeature,
} = require("../../../models");
const Joi = require("joi");

const gallerySchema = Joi.object({
  url: Joi.string().required(),
});

const addStories = async (req, res) => {
  try {
    const { error } = gallerySchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { url } = req.body;
    const userId = req.user.id;

    const isEscort = await Escort.findOne({
      where: { user_id: userId },
    });
    if (!isEscort) {
      return res
        .status(403)
        .json({ success: false, msg: "Only for escort users can add stories" });
    }

    const escortPackage = await UserPackage.findOne({
      where: { user_id: userId, status: "1" },
      attribattributes: ["package_id"],
    });

    const packageFeature = await PackageFeature.findOne({
      where: {
        package_id: escortPackage.package_id,
        combination_id: 4,
      },
      attributes: ["count"],
    });

    if (!escortPackage || !packageFeature) {
      return res.status(404).json({
        success: false,
        msg: "User package or package features not found",
      });
    }

    const storyCount = await EscortStories.count({
      where: {
        user_id: userId,
        is_deleted: "0",
      },
    });
    if (storyCount >= packageFeature.count) {
      return res.status(403).json({
        success: false,
        msg: "You have reached the maximum limit of stories based on your package. You cannot create more.",
      });
    }

    await EscortStories.create({
      user_id: userId,
      url,
    });

    res.status(200).json({ success: true, msg: "Stories added successfully" });
  } catch (error) {
    console.error("Error processing the data:", error);
    const status = error instanceof SyntaxError ? 400 : 500;
    return res
      .status(status)
      .json({ success: false, msg: "Stories data error" });
  }
};

module.exports = { addStories };
