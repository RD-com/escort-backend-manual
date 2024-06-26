const { EscortGallery, EscortGalleryMedia } = require("../../../models");
const Joi = require("joi");

const gallerySchema = Joi.object({
  galleryId: Joi.number().integer().required(),
});

const deleteGallery = async (req, res) => {
  try {
    const { error } = gallerySchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { galleryId } = req.body;
    const userId = req.user.id;

    const mainGallery = await EscortGallery.findOne({
      where: { id: galleryId, type: "2" },
    });

    if (mainGallery) {
      return res
        .status(400)
        .json({ success: false, msg: "Main gallery cannot be deleted" });
    }

    const gallery = await EscortGallery.update(
      { is_deleted: "1" },
      {
        where: { id: galleryId, user_id: userId },
      }
    );

    if (gallery[0] === 0) {
      return res.status(404).json({
        success: false,
        msg: "Gallery not found",
      });
    }
    await EscortGalleryMedia.update(
      { is_deleted: "1" },
      {
        where: { gallery_id: galleryId },
      }
    );

    res
      .status(200)
      .json({ success: true, msg: "Gallery deleted successfully" });
  } catch (error) {
    console.error("Error processing the data:", error);
    const status = error instanceof SyntaxError ? 400 : 500;
    return res
      .status(status)
      .json({ success: false, msg: "Gallery data error" });
  }
};

module.exports = { deleteGallery };
