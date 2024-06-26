const {
  EscortGallery,
  EscortGalleryMedia,
  UserPackage,
  PackageFeature,
} = require("../../../models");
const Joi = require("joi");

const gallerySchema = Joi.object({
  galleryId: Joi.number().integer().required(),
});

const getGallery = async (req, res) => {
  try {
    const { error } = gallerySchema.validate(req.query);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { galleryId } = req.query;
    const userId = req.user.id;

    const existingGallery = await EscortGallery.findOne({
      where: { id: galleryId, user_id: userId, is_deleted: "0" },
      attributes: ["type"],
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

    const userGalleryMedias = await EscortGallery.findOne({
      where: { id: galleryId, user_id: userId, is_deleted: "0" },
      include: [
        {
          model: EscortGalleryMedia,
          where: { is_deleted: "0" },
          attributes: ["url"],
        },
      ],
      order: [[{ model: EscortGalleryMedia }, "created_at", "DESC"]],
      limit: packageFeature.count,
    });

    if (!userGalleryMedias) {
      return res
        .status(404)
        .json({ success: false, msg: "Gallery media not found" });
    }

    const mediaUrls = userGalleryMedias.EscortGalleryMedia.map(
      (media) => media.url
    );
    const galleryName = userGalleryMedias.name;

    res.status(200).json({ success: true, galleryName, mediaUrls });
  } catch (error) {
    console.error("Error processing the data:", error);
    const status = error instanceof SyntaxError ? 400 : 500;
    return res
      .status(status)
      .json({ success: false, msg: "Gallery data error" });
  }
};

module.exports = { getGallery };
