const Joi = require("joi");
const {
  gender,
  packages,
  service,
  incall,
  outcall,
  sexualOrientation,
  nationality,
  language,
  hairColor,
  hairLength,
  eyeColor,
  breast,
  country,
  publicHair,
} = require("../../formController/functions");

const cardSchema = Joi.object({
  language: Joi.string(),
});

const getFilters = async (req, res) => {
  try {
    const { error } = cardSchema.validate(req.query);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const languageCode = req.query.language || "EN";

    const genderData = await gender(languageCode);
    const packageData = await packages(languageCode);
    const serviceData = await service(languageCode);
    const incallData = await incall(languageCode);
    const outcallData = await outcall(languageCode);
    const orientationData = await sexualOrientation(languageCode);
    const nationalityData = await nationality(languageCode);
    const languageData = await language();
    const hairColorData = await hairColor(languageCode);
    const hairLengthData = await hairLength(languageCode);
    const eyeColorData = await eyeColor(languageCode);
    const breastData = await breast(languageCode);
    const publicHairData = await publicHair(languageCode);

    const allData = {
      gender: genderData,
      package: packageData,
      service: serviceData,
      incall: incallData,
      outcall: outcallData,
      sexualOrientation: orientationData,
      nationality: nationalityData,
      language: languageData,
      hairColor: hairColorData,
      hairLength: hairLengthData,
      eyeColor: eyeColorData,
      breast: breastData,
      publicHair: publicHairData,
    };

    res.status(200).json({
      success: true,
      filters: allData,
    });
  } catch (error) {
    console.error("Error processing the data:", error);
    const status = error instanceof SyntaxError ? 400 : 500;
    return res
      .status(status)
      .json({ success: false, msg: "filters data error" });
  }
};

module.exports = { getFilters };
