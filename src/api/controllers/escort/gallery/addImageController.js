const {
  EscortGallery,
  EscortGalleryMedia,
  UserPackage,
  PackageFeature,
  ApprovalStatus,
  Users,
} = require("../../../models");
const Joi = require("joi");

const gallerySchema = Joi.object({
  galleryId: Joi.number().integer().required(),
  imageUrl: Joi.string().required(),
  mediaType: Joi.string().valid("1", "2"),
});

const addImage = async (req, res) => {
  try {
    const { error } = gallerySchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { galleryId, imageUrl, mediaType } = req.body;
    const userId = req.user.id;

    const existingGallery = await EscortGallery.findOne({
      where: { id: galleryId, user_id: userId, is_deleted: "0" },
      attributes: ["type", "name"],
    });

    if (!existingGallery) {
      return res.status(404).json({ success: false, msg: "Gallery not found" });
    }

    const featureCombinationId = existingGallery.type === "1" ? 3 : 1;

    const escortPackage = await UserPackage.findOne({
      where: { user_id: userId, status: "1" },
      attribattributes: ["package_id"],
    });

    const packageFeature = await PackageFeature.findOne({
      where: {
        package_id: escortPackage.package_id,
        combination_id: featureCombinationId,
      },
      attributes: ["count"],
    });

    if (!escortPackage || !packageFeature) {
      return res.status(404).json({
        success: false,
        msg: "User package or package features not found",
      });
    }

    const imageCount = await EscortGalleryMedia.count({
      where: {
        gallery_id: galleryId,
        is_deleted: "0",
      },
    });
    if (imageCount >= packageFeature.count) {
      return res.status(403).json({
        success: false,
        msg: "You have reached the maximum limit of images based on your package. You cannot upload more.",
      });
    }

    await EscortGalleryMedia.create({
      gallery_id: galleryId,
      url: imageUrl,
      media_type: mediaType,
    });

    if (existingGallery.name === "main") {
      await ApprovalStatus.update(
        { is_gallery_verified: "0" },
        { where: { user_id: userId } }
      );

      await Users.update(
        { is_account_verified: "0" },
        { where: { id: userId } }
      );
    }

    res.status(200).json({ success: true, msg: "Images added successfully" });
  } catch (error) {
    console.error("Error processing the data:", error);
    const status = error instanceof SyntaxError ? 400 : 500;
    return res
      .status(status)
      .json({ success: false, msg: "Gallery data error" });
  }
};

module.exports = { addImage };
