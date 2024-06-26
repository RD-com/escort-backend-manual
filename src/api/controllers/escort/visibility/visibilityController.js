const {
  EscortAccountVisibilityGenderLimit,
  EscortAccountVisibilityCountryLimit,
  Country,
  EscortAccountVisibilityAgeLimit,
} = require("../../../models");
const { getUniqueGenderCombinationIds } = require("../../combinationIds");

const Joi = require("joi");

/*
    {
        "minAge":18,
        "maxAge":50,
        "countryShortCodes": ["sl","au"],
        "genderCombinationIds": [1,2]
    }
*/

const visibilitySchema = Joi.object({
  minAge: Joi.number().integer(),
  maxAge: Joi.number().integer(),
  countryShortCodes: Joi.array().items(Joi.string()),
  genderCombinationIds: Joi.array().items(Joi.number().integer()),
});

const createVisibility = async (req, res) => {
  try {
    const { error } = visibilitySchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }
    const { minAge, maxAge, countryShortCodes, genderCombinationIds } =
      req.body;
    const userId = req.user.id;

    const genderCombinationIdArray = await getUniqueGenderCombinationIds();
    const uniqueCountryShortCodes = await Country.findAll({
      attributes: ["short_code"],
    });
    const countryShortCodeArray = uniqueCountryShortCodes.map(
      (record) => record.short_code
    );

    const isValidCountryCodes =
      countryShortCodes === undefined
        ? undefined
        : countryShortCodes.every((code) =>
            countryShortCodeArray.includes(code)
          );
    const isValidGenderCombinationIds =
      genderCombinationIds === undefined
        ? undefined
        : genderCombinationIds.every((code) =>
            genderCombinationIdArray.includes(code)
          );

    if (
      (isValidCountryCodes || isValidCountryCodes === undefined) &&
      (isValidGenderCombinationIds || isValidGenderCombinationIds === undefined)
    ) {
      const ageLimitData = {
        user_id: userId,
        min_age: minAge,
        max_age: maxAge,
      };

      await EscortAccountVisibilityAgeLimit.upsert(ageLimitData);

      const countryLimitPromises = isValidCountryCodes
        ? countryShortCodes.map(async (countryShortCode) => {
            const countryLimitData = {
              user_id: userId,
              country_short_code: countryShortCode,
            };
            await EscortAccountVisibilityCountryLimit.upsert(countryLimitData);
          })
        : [];

      const genderLimitPromises = isValidGenderCombinationIds
        ? genderCombinationIds.map(async (genderCombinationId) => {
            const genderLimitData = {
              user_id: userId,
              combination_id: genderCombinationId,
            };
            await EscortAccountVisibilityGenderLimit.upsert(genderLimitData);
          })
        : [];

      await Promise.all([...countryLimitPromises, ...genderLimitPromises]);

      return res
        .status(200)
        .json({ success: true, msg: "Visibility Created Successfully" });
    }

    console.error("Error processing the data:", error);
    res.status(400).json({ success: false, msg: "Escort registration error" });
  } catch (error) {
    console.error("Error processing the data:", error);
    res.status(500).json({ success: false, msg: "Escort registration error" });
  }
};

module.exports = { createVisibility };
