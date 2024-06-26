const {
  EscortGallery,
  UserPackage,
  PackageFeature,
} = require("../../../models");
const Joi = require("joi");

const gallerySchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().integer().required(),
});

const createGallery = async (req, res) => {
  try {
    const { error } = gallerySchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { name, price } = req.body;
    const userId = req.user.id;

    const existingGallery = await EscortGallery.findOne({
      where: { name, user_id: userId, is_deleted: "0" },
    });

    if (existingGallery) {
      return res.status(400).json({
        success: false,
        msg: "Gallery with this name already exists.",
      });
    }

    const escortPackage = await UserPackage.findOne({
      where: { user_id: userId, status: "1" },
      attribattributes: ["package_id"],
    });

    const packageFeature = await PackageFeature.findOne({
      where: {
        package_id: escortPackage.package_id,
        combination_id: 2,
      },
      attributes: ["count"],
    });

    if (!escortPackage || !packageFeature) {
      return res.status(404).json({
        success: false,
        msg: "User package or package features not found",
      });
    }

    const galleryCount = await EscortGallery.count({
      where: {
        user_id: userId,
        type: "1",
        is_deleted: "0",
      },
    });
    if (galleryCount >= packageFeature.count) {
      return res.status(403).json({
        success: false,
        msg: "You have reached the maximum limit of galleries based on your package. You cannot create more.",
      });
    }

    const gallery = await EscortGallery.create({
      user_id: userId,
      name,
      price,
      type: "1",
    });

    res
      .status(200)
      .json({ success: true, msg: "Gallery created successfully" });
  } catch (error) {
    console.error("Error processing the data:", error);
    const status = error instanceof SyntaxError ? 400 : 500;
    return res
      .status(status)
      .json({ success: false, msg: "Gallery data error" });
  }
};

module.exports = { createGallery };
