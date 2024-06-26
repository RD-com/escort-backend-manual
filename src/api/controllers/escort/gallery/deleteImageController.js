const { EscortGalleryMedia } = require("../../../models");
const Joi = require("joi");
const { Sequelize } = require("sequelize");

const gallerySchema = Joi.object({
  imageUrls: Joi.array().items(Joi.string()).required(),
});

const deleteImage = async (req, res) => {
  try {
    const { error } = gallerySchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { imageUrls } = req.body;
    const userId = req.user.id;

    const [numAffectedRows, affectedRows] = await EscortGalleryMedia.update(
      { is_deleted: "1" },
      {
        where: { url: { [Sequelize.Op.in]: imageUrls } },
      }
    );

    if (numAffectedRows === 0) {
      return res.status(404).json({ success: false, msg: "Image not found" });
    }

    res.status(200).json({ success: true, msg: "Image deleted successfully" });
  } catch (error) {
    console.error("Error processing the data:", error);
    const status = error instanceof SyntaxError ? 400 : 500;
    return res
      .status(status)
      .json({ success: false, msg: "Gallery data error" });
  }
};

module.exports = { deleteImage };
