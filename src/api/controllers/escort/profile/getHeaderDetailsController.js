const { Escort, Users, Country } = require("../../../models");
const Joi = require("joi");
const detailsSchema = Joi.object({
  username: Joi.string().required(),
});

const headerDetails = async (req, res) => {
  try {
    const { error } = detailsSchema.validate(req.query);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const username = req.query.username;

    const data = await Users.findOne({
      where: { username },
      attributes: ["id"],
      include: [
        {
          model: Escort,
          attributes: [
            ["user_id", "userId"],
            "name",
            "age",
            ["gender_combination_id", "genderCombinationId"],
            ["country_short_code", "countryShortCode"],
            "city",
          ],
        },
      ],
    });

    if (!data) {
      return res
        .status(400)
        .json({ success: false, msg: "User Does Not Exist" });
    }

    const { userId, name, age, genderCombinationId, city } = data.Escort.dataValues;
    const countryShortCode = data.Escort.dataValues.countryShortCode;

    const countryData = await Country.findOne({
      where: { short_code: countryShortCode },
      attributes: ["content"],
    });

    const headerData = {
      userId,
      name,
      age,
      genderCombinationId,
      city,
      country: countryData.content,
    };

    res.status(200).json({ success: true, data: headerData });
  } catch (error) {
    console.error("Error processing the data:", error);
    res.status(400).json({ success: false, msg: "Get escort data error" });
  }
};

module.exports = { headerDetails };
