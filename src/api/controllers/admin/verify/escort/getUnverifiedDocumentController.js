const { EscortAccountVerificationDocs, Escort } = require("../../../../models");
const Joi = require("joi");

const documentVerifySchema = Joi.object({
  escortId: Joi.string().required(),
});

const getUnverifiedDocument = async (req, res) => {
  try {
    const { error } = documentVerifySchema.validate(req.query);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }
    const { escortId } = req.query;

    const escortDocumentData = await EscortAccountVerificationDocs.findAll({
      where: {
        user_id: escortId,
        is_approved: "0",
      },
      attributes: [["combination_id", "combinationId"], "url"],
    });

    if (escortDocumentData.length === 0) {
      return res
        .status(404)
        .json({ success: false, msg: "Escort's documents not found" });
    }

    const data = await Escort.findOne({
      where: { user_id: escortId },
      attributes: [
        "name",
        "age",
        ["gender_combination_id", "genderCombinationId"],
        ["country_short_code", "countryShortCode"],
        "city",
        ["nationality_id", "nationalityId"],
      ],
    });

    if (!data) {
      return res.status(404).json({ success: false, msg: "Escort not found" });
    }

    res
      .status(200)
      .json({ success: true, documents: escortDocumentData, settings: data });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

module.exports = { getUnverifiedDocument };
