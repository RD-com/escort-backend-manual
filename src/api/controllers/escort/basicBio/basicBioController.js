const {
  Escort,
  Country,
  Nationality,
  Users,
  ApprovalStatus,
} = require("../../../models");
const { getUniqueGenderCombinationIds } = require("../../combinationIds");
const Joi = require("joi");
const { sanitize } = require("../../../services");

const basicBioSchema = Joi.object({
  age: Joi.number().integer(),
  genderCombinationId: Joi.number().integer(),
  countryShortCode: Joi.string(),
  city: Joi.string(),
  nationalityId: Joi.number().integer(),
});

const createBasicBio = async (req, res) => {
  try {
    const { error } = basicBioSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { age, genderCombinationId, countryShortCode, city, nationalityId } =
      req.body;

    const userId = req.user.id;

    try {
      const genderCombinationIdArray = await getUniqueGenderCombinationIds();

      const uniquecountryShortCodes = await Country.findAll({
        attributes: ["short_code"],
      });
      const countryShortCodeArray = uniquecountryShortCodes.map(
        (record) => record.short_code
      );

      const uniqueNationalityIds = await Nationality.findAll({
        attributes: ["id"],
      });
      const uniqueNationalityIdArray = uniqueNationalityIds.map(
        (record) => record.id
      );

      if (
        (genderCombinationId &&
          !genderCombinationIdArray.includes(genderCombinationId)) ||
        (countryShortCode &&
          !countryShortCodeArray.includes(countryShortCode)) ||
        (nationalityId && !uniqueNationalityIdArray.includes(nationalityId))
      ) {
        return res.status(400).json({
          success: false,
          msg: "Basic Bio data that you provided not found",
        });
      }
      const sanitizedCity = city ? sanitize.sanitizeInput(city) : undefined;

      const basicBioData = {
        user_id: userId,
        age,
        gender_combination_id: genderCombinationId,
        country_short_code: countryShortCode,
        city: sanitizedCity,
        nationality_id: nationalityId,
      };
      await Escort.upsert(basicBioData);

      await Users.update(
        {
          current_step: "/escort/register/basic-bio",
          is_account_verified: "0",
        },
        { where: { id: userId } }
      );
      await ApprovalStatus.update(
        {
          is_settings_verified: "0",
        },
        { where: { user_id: userId } }
      );

      return res
        .status(200)
        .json({ success: true, msg: "Basic Bio Created Successfully" });
    } catch (error) {
      console.error("Error processing the data:", error);
      res
        .status(400)
        .json({ success: false, msg: "Escort registration error" });
    }
  } catch (error) {
    console.error("Error processing the data:", error);
    res.status(500).json({ success: false, msg: "Escort registration error" });
  }
};

module.exports = { createBasicBio };
