const {
  EscortAccountVisibilityGenderLimit,
  EscortAccountVisibilityCountryLimit,
  EscortAccountVisibilityAgeLimit,
  Member,
  Users,
} = require("../../../models");

const Joi = require("joi");

const visibilitySchema = Joi.object({
  escortUserId: Joi.string().required(),
});

const checkVisibility = async (req, res) => {
  try {
    const { error } = visibilitySchema.validate(req.query);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }
    const { escortUserId } = req.query;
    const memberUserId = req.user.id;
    try {
      const memberData = await Member.findOne({
        where: { user_id: memberUserId },
        attributes: ["country_short_code", "gender_combination_id", "age"],
      });

      if (!memberData) {
        console.error("Error processing the data");
        return res
          .status(404)
          .json({ success: false, msg: "Member not found" });
      }
      const escortData = await Users.findByPk(escortUserId, {
        attributes: ["id"],

        include: [
          {
            model: EscortAccountVisibilityGenderLimit,
            attributes: ["combination_id"],
          },
          {
            model: EscortAccountVisibilityCountryLimit,
            attributes: ["country_short_code"],
          },
          {
            model: EscortAccountVisibilityAgeLimit,
            attributes: ["min_age", "max_age"],
          },
        ],
      });

      const isCountryMatch = escortData.EscortAccountVisibilityCountryLimits
        ? escortData.EscortAccountVisibilityCountryLimits.some(
            (countryLimit) =>
              memberData.country_short_code ===
              countryLimit.dataValues.country_short_code
          )
        : false;

      const isAgeOutRange = escortData.EscortAccountVisibilityAgeLimit
        ? memberData.age <
            escortData.EscortAccountVisibilityAgeLimit.dataValues.min_age ||
          memberData.age >
            escortData.EscortAccountVisibilityAgeLimit.dataValues.max_age
        : false;

      const isGenderMatch = escortData.EscortAccountVisibilityGenderLimits
        ? escortData.EscortAccountVisibilityGenderLimits.some(
            (genderLimit) =>
              memberData.gender_combination_id === genderLimit.combination_id
          )
        : false;

      const hasAuthority = !(isCountryMatch || isAgeOutRange || isGenderMatch);

      const response = {
        success: hasAuthority,
        msg: hasAuthority
          ? "Member has authority to see this escort"
          : "Member does not have authority to see this escort",
      };

      res.status(hasAuthority ? 200 : 401).json(response);
    } catch (error) {
      console.error("Error processing the data:", error);
      res
        .status(400)
        .json({ success: false, msg: "Escort check visibility error" });
    }
  } catch (error) {
    console.error("Error processing the data:", error);
    res
      .status(500)
      .json({ success: false, msg: "Escort check visibility error" });
  }
};

module.exports = { checkVisibility };
