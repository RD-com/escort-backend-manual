const {
  EscortGallery,
  EscortGalleryMedia,
  UserPackage,
  PackageFeature,
} = require("../../../models");

const getAllGalleries = async (req, res) => {
  try {
    const userId = req.user.id;

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

    const escortGallery = await EscortGallery.findAll({
      where: {
        user_id: userId,
        is_deleted: "0",
      },
      include: [
        {
          model: EscortGalleryMedia,
          where: {
            is_deleted: "0",
          },
          attributes: ["url"],
          required: false,
        },
      ],
      attributes: ["id", "name", "type", "price"],
      order: [[{ model: EscortGalleryMedia }, "created_at", "DESC"]],
      limit: packageFeature.count + 1,
    });

    if (escortGallery.length === 0) {
      return res
        .status(404)
        .json({ success: false, msg: "Escort does not have any gallery" });
    }

    const galleries = escortGallery.map((gallery) => {
      const latestMediaUrl =
        gallery.EscortGalleryMedia.length > 0
          ? gallery.EscortGalleryMedia[0].url
          : "";
      const mediaCount = gallery.EscortGalleryMedia.length;
      return {
        galleryId: gallery.id,
        galleryName: gallery.name,
        type: gallery.type,
        price: gallery.price,
        latestMediaUrl,
        mediaCount,
      };
    });

    return res.status(200).json({
      success: true,
      galleries,
    });
  } catch (error) {
    console.error("Error processing the data:", error);
    const status = error instanceof SyntaxError ? 400 : 500;
    return res
      .status(status)
      .json({ success: false, msg: "Gallery data error" });
  }
};

module.exports = { getAllGalleries };
