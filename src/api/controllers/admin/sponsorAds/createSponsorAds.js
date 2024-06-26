const { SponsorAdvertisement } = require("../../../models");
const Joi = require("joi");
const { Op } = require("sequelize");
require("dotenv").config();

const statusSchema = Joi.object({
  popupId: Joi.string().required(),
  imageUrl: Joi.string().required(),
  link: Joi.string(),
  meta: Joi.string(),
});

const createSponsorAd = async (req, res) => {
  try {
    const { error } = statusSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { popupId, imageUrl, link, meta } = req.body;

    const adData = {
      ad_id: popupId,
      img: imageUrl,
      url: link,
      meta,
    };

    await SponsorAdvertisement.upsert(adData);

    res.status(201).json({
      success: true,
      msg: "Sponsor Ad Created",
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ success: false, msg: "Create Sponso Ad Error" });
  }
};

module.exports = { createSponsorAd };
