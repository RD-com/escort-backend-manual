const { EscortPhysicalFeature } = require("../../../models");
const {
  getUniqueBreastCombinationIds,
  getUniqueEyeColorCombinationIds,
  getUniqueHairColorCombinationIds,
  getUniqueHairLengthCombinationIds,
  getUniquePublicHairCombinationIds,
} = require("../../combinationIds");

const Joi = require("joi");

const physicalFeatureSchema = Joi.object({
  eyeColorId: Joi.number().integer(),
  hairColorId: Joi.number().integer(),
  hairLengthId: Joi.number().integer(),
  height: Joi.number().integer().min(135).max(200),
  weight: Joi.number().integer().min(35).max(200),
  dressSize: Joi.string().valid("XS", "S", "M", "L", "XL", "XXL"),
  shoeSize: Joi.number().integer().min(30).max(50),
  bust: Joi.number().integer().min(100).max(200),
  waist: Joi.number().integer().min(10).max(200),
  hip: Joi.number().integer().min(10).max(200),
  cupSize: Joi.string().valid(
    "A",
    "B",
    "C",
    "D",
    "DD",
    "F",
    "FF",
    "G",
    "H",
    "J"
  ),
  breastId: Joi.number().integer(),
  publicHairId: Joi.number().integer(),
});

const createPhysicalFeature = async (req, res) => {
  try {
    const { error } = physicalFeatureSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const {
      eyeColorId,
      hairColorId,
      hairLengthId,
      height,
      weight,
      dressSize,
      shoeSize,
      bust,
      waist,
      hip,
      cupSize,
      breastId,
      publicHairId,
    } = req.body;

    const userId = req.user.id;

    try {
      const breastCombinationIdArray = await getUniqueBreastCombinationIds();
      const eyeColorCombinationIdArray =
        await getUniqueEyeColorCombinationIds();
      const hairColorCombinationIdArray =
        await getUniqueHairColorCombinationIds();
      const hairLengthCombinationIdArray =
        await getUniqueHairLengthCombinationIds();
      const publicHairCombinationIdArray =
        await getUniquePublicHairCombinationIds();

      if (
        (breastId && !breastCombinationIdArray.includes(breastId)) ||
        (eyeColorId && !eyeColorCombinationIdArray.includes(eyeColorId)) ||
        (hairColorId && !hairColorCombinationIdArray.includes(hairColorId)) ||
        (hairLengthId &&
          !hairLengthCombinationIdArray.includes(hairLengthId)) ||
        (publicHairId && !publicHairCombinationIdArray.includes(publicHairId))
      ) {
        return res.status(400).json({
          success: false,
          msg: "Physical Feature data that you provided not found",
        });
      }

      const physicalFeatureData = {
        user_id: userId,
        eye_color_id: eyeColorId,
        hair_color_id: hairColorId,
        hair_length_id: hairLengthId,
        height,
        weight,
        dress_size: dressSize,
        shoe_size: shoeSize,
        bust,
        waist,
        hip,
        cup_size: cupSize,
        breast_id: breastId,
        public_hair_id: publicHairId,
      };
      await EscortPhysicalFeature.upsert(physicalFeatureData);
      return res
        .status(201)
        .json({ success: true, msg: "Physical feature created successfully" });
    } catch (error) {
      console.error("Error processing the data:", error);
      res
        .status(400)
        .json({ success: false, msg: "Escort registration error" });
    }
  } catch (error) {
    console.error("Internal Server Error:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Escort registration error" });
  }
};

module.exports = { createPhysicalFeature };
