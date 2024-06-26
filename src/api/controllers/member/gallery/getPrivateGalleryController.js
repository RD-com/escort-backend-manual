const {
  MemberGallery,
  EscortGallery,
  EscortGalleryMedia,
} = require("../../../models");
const Joi = require("joi");

const gallerySchema = Joi.object({
  galleryId: Joi.number().integer().required(),
});
const getPrivateGallery = async (req, res) => {
  try {
    const { error } = gallerySchema.validate(req.query);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }
    const { galleryId } = req.query;
    const memberId = req.user.id;

    const escortGallery = await EscortGallery.findOne({
      where: {
        id: galleryId,
        type: "1",
        is_deleted: "0",
      },
      include: [
        {
          model: EscortGalleryMedia,
          where: {
            is_deleted: "0",
          },
          attributes: ["url"],
        },
      ],
      order: [[{ model: EscortGalleryMedia }, "created_at", "DESC"]],
    });

    if (!escortGallery) {
      return res.status(404).json({
        success: false,
        msg: "Escort does not have a private gallery.",
      });
    }

    const existingGallery = await MemberGallery.findOne({
      where: { member_id: memberId, gallery_id: galleryId },
    });

    if (!existingGallery) {
      return res
        .status(403)
        .json({ success: false, msg: "You have to bought this gallery." });
    }

    const privateMediaUrls = escortGallery.EscortGalleryMedia.map(
      (media) => media.url
    );

    return res.status(200).json({ success: true, URLs: privateMediaUrls });
  } catch (error) {
    console.error("Error fetching escort gallery:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Get escort gallery data error" });
  }
};

module.exports = { getPrivateGallery };
