const { CityLocalization } = require("../../../models");
const Joi = require("joi");

const detailsSchema = Joi.object({
  language: Joi.string(),
});

const getCities = async (req, res) => {
  try {
    const { error } = detailsSchema.validate(req.query);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const language = req.query.language || "EN";

    const cityData = await CityLocalization.findAll({
      where: { language_code: language },
      attributes: [
        ["combination_id", "value"],
        ["content", "label"],
      ],
    });

    if (cityData.length === 0) {
      return res
        .status(404)
        .json({ success: false, msg: "No city data found" });
    }

    return res.status(200).json({ success: true, defaults: cityData });
  } catch (error) {
    console.error("Error processing the data:", error);
    res.status(400).json({ success: false, msg: "Get escort data error" });
  }
};

module.exports = { getCities };
