const {
  MemberGallery,
  EscortGallery,
  EscortGalleryMedia,
} = require("../../../models");

const getAllBoughtGalleries = async (req, res) => {
  try {
    const memberId = req.user.id;

    const boughtGalleries = await MemberGallery.findAll({
      where: { member_id: memberId },
      include: [
        {
          model: EscortGallery,
          where: {
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
          attributes: ["id"],
        },
      ],
      order: [[{ model: EscortGalleryMedia }, "created_at", "DESC"]],
    });

    if (!boughtGalleries || boughtGalleries.length === 0) {
      return res.status(404).json({
        success: false,
        msg: "Member has not bought any galleries",
      });
    }

    const allBoughtGalleries = boughtGalleries.map((gallery) => {
      const escortGallery = gallery.EscortGallery;
      const galleryId = escortGallery.id;
      const mediaUrls = escortGallery.EscortGalleryMedia.map(
        (media) => media.url
      );
      return { galleryId, mediaUrls };
    });

    return res
      .status(200)
      .json({ success: true, galleries: allBoughtGalleries });
  } catch (error) {
    console.error("Error fetching bought galleries:", error);
    return res.status(500).json({
      success: false,
      msg: "Get bought galleries data error",
    });
  }
};

module.exports = { getAllBoughtGalleries };
