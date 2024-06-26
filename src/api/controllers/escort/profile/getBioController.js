const {
  Escort,
  Users,
  GenderLocalization,
  Country,
  Nationality,
  SexualOrientationLocalization,
  EscortPhysicalFeature,
  EyeColorLocalization,
  HairColorLocalization,
  HairLengthLocalization,
  BreastLocalization,
  PublicHairLocalization,
  EscortAdditionalInformation,
  EscortAvailability,
  IncallLocalization,
  OutcallLocalization,
} = require("../../../models");
const Joi = require("joi");
const detailsSchema = Joi.object({
  language: Joi.string(),
  username: Joi.string().required(),
});

const bioDetails = async (req, res) => {
  try {
    const { error } = detailsSchema.validate(req.query);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const username = req.query.username;
    const language = req.query.language || "EN";

    const user = await Users.findOne({
      where: { username },
      attributes: ["id"],
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "User Does Not Exist" });
    }

    const userId = user.id;

    const basicData = await Escort.findOne({
      where: { user_id: userId },
      attributes: [
        "name",
        "age",
        ["gender_combination_id", "genderCombinationId"],
        ["country_short_code", "countryShortCode"],
        "city",
        ["nationality_id", "nationalityId"],
        ["sexual_orientation_id", "sexualOrientationId"],
      ],
    });
    const { name, age, city } = basicData.dataValues;
    const genderData = await GenderLocalization.findOne({
      where: {
        language_code: language,
        combination_id: basicData.dataValues.genderCombinationId,
      },
      attributes: ["content"],
    });

    const countryData = await Country.findOne({
      where: {
        short_code: basicData.dataValues.countryShortCode,
      },
      attributes: ["content"],
    });

    const nationalityData = await Nationality.findOne({
      where: {
        id: basicData.dataValues.nationalityId,
      },
      attributes: ["name"],
    });

    const sexualOrientationData = await SexualOrientationLocalization.findOne({
      where: {
        language_code: language,
        combination_id: basicData.dataValues.sexualOrientationId,
      },
      attributes: ["content"],
    });

    const physicalData = await EscortPhysicalFeature.findOne({
      where: { user_id: userId },
      attributes: [
        ["eye_color_id", "eyeColorId"],
        ["hair_color_id", "hairColorId"],
        ["hair_length_id", "hairLengthId"],
        "height",
        "weight",
        ["dress_size", "dressSize"],
        ["shoe_size", "shoeSize"],
        "bust",
        "waist",
        "hip",
        ["cup_size", "cupSize"],
        ["breast_id", "breastId"],
        ["public_hair_id", "publicHairId"],
      ],
    });
    const { height, weight, dressSize, shoeSize, bust, waist, hip, cupSize } =
      physicalData.dataValues;

    const eyeColorData = await EyeColorLocalization.findOne({
      where: {
        language_code: language,
        combination_id: physicalData.dataValues.eyeColorId,
      },
      attributes: ["content"],
    });

    const hairColorData = await HairColorLocalization.findOne({
      where: {
        language_code: language,
        combination_id: physicalData.dataValues.hairColorId,
      },
      attributes: ["content"],
    });

    const hairLengthData = await HairLengthLocalization.findOne({
      where: {
        language_code: language,
        combination_id: physicalData.dataValues.hairLengthId,
      },
      attributes: ["content"],
    });

    const breastData = await BreastLocalization.findOne({
      where: {
        language_code: language,
        combination_id: physicalData.dataValues.breastId,
      },
      attributes: ["content"],
    });

    const publicHairData = await PublicHairLocalization.findOne({
      where: {
        language_code: language,
        combination_id: physicalData.dataValues.publicHairId,
      },
      attributes: ["content"],
    });

    const additionalData = await EscortAdditionalInformation.findOne({
      where: {
        user_id: userId,
      },
      attributes: [
        ["is_smoking", "isSmoking"],
        ["is_drinking", "isDrinking"],
        ["is_tatoos", "isTatoos"],
        ["is_piercing", "isPiercing"],
        ["special_characteristics", "specialCharacteristics"],
      ],
    });
    const {
      isSmoking,
      isDrinking,
      isTatoos,
      isPiercing,
      specialCharacteristics,
    } = additionalData.dataValues;

    const availabilityData = await EscortAvailability.findOne({
      where: {
        user_id: userId,
      },
      attributes: [
        ["incall_combination_id", "incallCombinationId"],
        ["outcall_combination_id", "outcallCombinationId"],
      ],
    });

    const incallData = await IncallLocalization.findOne({
      where: {
        language_code: language,
        combination_id: availabilityData.dataValues.incallCombinationId,
      },
      attributes: ["content"],
    });

    const outcallData = await OutcallLocalization.findOne({
      where: {
        language_code: language,
        combination_id: availabilityData.dataValues.outcallCombinationId,
      },
      attributes: ["content"],
    });

    const bioData = [
      { name: name },
      { age: age },
      { city: city },
      { country: countryData.content },
      { gender: genderData.content },
      { nationality: nationalityData.name },
      { sexualOrientation: sexualOrientationData.content },
      { eyeColor: eyeColorData.content },
      { hairColor: hairColorData.content },
      { hairLength: hairLengthData.content },
      { breast: breastData.content },
      { publicHair: publicHairData.content },
      { height: height },
      { weight: weight },
      { dressSize: dressSize },
      { shoeSize: shoeSize },
      { bust: bust },
      { waist: waist },
      { hip: hip },
      { cupSize: cupSize },
      { isSmoking: isSmoking },
      { isDrinking: isDrinking },
      { isTatoos: isTatoos },
      { isPiercing: isPiercing },
      { specialCharacteristics: specialCharacteristics },
      { incall: incallData.content },
      { outcall: outcallData.content },
    ];

    const simplifiedBioData = bioData
      .filter((entry) => entry[Object.keys(entry)[0]] !== null)
      .map((entry) => {
        const key = Object.keys(entry)[0];
        const value = entry[key];
        return { key, value };
      });

    res.status(200).json({ success: true, data: simplifiedBioData });
  } catch (error) {
    console.error("Error processing the data:", error);
    res.status(400).json({ success: false, msg: "Get escort data error" });
  }
};

module.exports = { bioDetails };
