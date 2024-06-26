const { Member, Country, Users } = require("../../../models");
const { getUniqueGenderCombinationIds } = require("../../combinationIds");
const Joi = require("joi");

const basicBioSchema = Joi.object({
  countryShortCode: Joi.string(),
  age: Joi.number().integer(),
  genderCombinationId: Joi.number().integer(),
  name: Joi.string(),
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

    const { countryShortCode, age, genderCombinationId, name } = req.body;

    const userId = req.user.id;

    try {
      const genderCombinationIdArray = await getUniqueGenderCombinationIds();

      const uniquecountryShortCodes = await Country.findAll({
        attributes: ["short_code"],
      });
      const countryShortCodeArray = uniquecountryShortCodes.map(
        (record) => record.short_code
      );

      if (
        (genderCombinationId &&
          !genderCombinationIdArray.includes(genderCombinationId)) ||
        (countryShortCode && !countryShortCodeArray.includes(countryShortCode))
      ) {
        return res.status(400).json({
          success: false,
          msg: "Basic Bio data that you provided not found",
        });
      }

      const basicBioData = {
        user_id: userId,
        age,
        country_short_code: countryShortCode,
        gender_combination_id: genderCombinationId,
        name,
      };
      await Member.upsert(basicBioData);

      await Users.update({ current_step: "/" }, { where: { id: userId } });

      return res
        .status(200)
        .json({ success: true, msg: "Basic Bio Created Successfully" });
    } catch (error) {
      console.error("Error processing the data:", error);
      res
        .status(400)
        .json({ success: false, msg: "Member registration error" });
    }
  } catch (error) {
    console.error("Error processing the data:", error);
    res.status(500).json({ success: false, msg: "Member registration error" });
  }
};

module.exports = { createBasicBio };
