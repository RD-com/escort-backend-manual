const form = require("./functions");
const Joi = require("joi");
const languageSchema = Joi.object({
  language: Joi.string(),
  data: Joi.string(),
});
const getFormData = async (req, res) => {
  try {
    const { error } = languageSchema.validate(req.query);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }
    const { language, data } = req.query;
    const code =
      language === undefined ? process.env.DEFAULT_LANGUAGE : language;

    const basicBio = [form.gender, form.nationality, form.country];
    const physicalFeatures = [
      form.hairColor,
      form.hairLength,
      form.eyeColor,
      form.breast,
      form.publicHair,
    ];
    const languages = [form.language, form.languageProficiency];
    const workingCities = [form.city];
    const availability = [form.incall, form.outcall];
    const sexualOrientation = [
      form.sexualOrientation,
      form.serviceOfferingCategory,
    ];
    const services = [form.service];
    const workingHours = [form.day];
    const contactInstructions = [form.contactInstruction];
    const socialMedia = [form.socialMedia];

    const dataMappings = {
      basicBio,
      physicalFeatures,
      languages,
      workingCities,
      availability,
      sexualOrientation,
      services,
      workingHours,
      contactInstructions,
      socialMedia,
    };

    try {
      const defaults = {};
      if (!(data in dataMappings)) {
        return res.status(404).json({ success: false, msg: "Data not found" });
      }

      await Promise.all(
        dataMappings[data].map(async (func) => {
          const result = func.length === 0 ? await func() : await func(code);
          defaults[func.name] = result;
        })
      );
      return res.status(200).json({ success: true, defaults });
    } catch (error) {
      console.error("Error processing the data:", error);
      res.status(400).json({ success: false, msg: "Get form data error" });
    }
  } catch (error) {
    console.error("Error processing the data:", error);
    res.status(500).json({ success: false, msg: "Get form data error" });
  }
};

module.exports = { getFormData };
