const { SponsorAdvertisement } = require("../../../models");
const Joi = require("joi");
const { Op } = require("sequelize");
require("dotenv").config();

const statusSchema = Joi.object({
  popupId: Joi.string().required(),
});

const viewSponsorAd = async (req, res) => {
  try {
    const { error } = statusSchema.validate(req.query);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const popupId = req.query.popupId;

    const adDetails = await SponsorAdvertisement.findOne({ where:{ad_id: popupId} });



    if (!adDetails) {
      return res.status(404).json({ success: false, msg: "Ad not found" });
    }

    const { ad_id, img, url, meta } = adDetails.dataValues;

    res.status(200).json({
      success: true,
      sponsodrAd: { popupId: ad_id, imageUrl: img, link: url, meta },
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ success: false, msg: "Get Sponso Ad Error" });
  }
};

module.exports = { viewSponsorAd };
