const { EscortGallery, EscortGalleryMedia, Users } = require("../../../models");
const Joi = require("joi");

const gallerySchema = Joi.object({
  username: Joi.string().required(),
});
const allGalleries = async (req, res) => {
  try {
    const { error } = gallerySchema.validate(req.query);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }
    const { username } = req.query;

    const escort = await Users.findOne({
      where: {
        username,
      },
      attributes: ["id"],
    });

    if (!escort) {
      return res.status(404).json({ success: false, msg: "Escort not found" });
    }

    const escortId = escort.id;
    const escortGallery = await EscortGallery.findAll({
      where: {
        user_id: escortId,
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
          order: [["createdAt", "DESC"]],
        },
      ],
      attributes: ["id", "name", "type", "price"],
    });

    if (escortGallery.length === 0) {
      return res
        .status(404)
        .json({ success: false, msg: "Escort does not have any gallery" });
    }

    const galleries = escortGallery
      .map((gallery) => {
        let mediaUrls = [];
        let mediaCount = 0;

        if (gallery.type === "2" && gallery.EscortGalleryMedia.length > 0) {
          mediaUrls = gallery.EscortGalleryMedia.map((media) => media.url);
          mediaCount = mediaUrls.length;
        } else if (gallery.EscortGalleryMedia.length > 0) {
          mediaUrls = [gallery.EscortGalleryMedia[0].url];
          mediaCount = gallery.EscortGalleryMedia.length;
        }

        if (mediaUrls.length > 0) {
          return {
            id: gallery.id,
            name: gallery.name,
            type: gallery.type,
            price: gallery.price,
            mediaUrls,
            mediaCount,
          };
        }
      })
      .filter(Boolean);

    return res.status(200).json({
      success: true,
      galleries,
    });
  } catch (error) {
    console.error("Error fetching escort gallery:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Get escort gallery data error" });
  }
};

module.exports = { allGalleries };
