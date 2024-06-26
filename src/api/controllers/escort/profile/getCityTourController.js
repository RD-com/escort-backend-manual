const {
  Escort,
  Users,
  EscortCityTour,
  CityLocalization,
} = require("../../../models");
const Joi = require("joi");

const detailsSchema = Joi.object({
  language: Joi.string(),
  username: Joi.string().required(),
});

const cityTourDetails = async (req, res) => {
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

    const cityTourData = await EscortCityTour.findOne({
      where: {
        user_id: userId,
      },
      attributes: [
        ["combination_id", "combinationId"],
        "from",
        "to",
        ["contact_number", "contactNumber"],
        ["contact_email", "contactEmail"],
      ],
    });

    const { from, to, contactNumber, contactEmail } = cityTourData.dataValues;

    const cities = await CityLocalization.findOne({
      where: {
        language_code: language,
        combination_id: cityTourData.dataValues.combinationId,
      },
      attributes: ["content"],
    });

    const cityTourDetailsData = [
      { city: cities.dataValues.content },
      { from: from },
      { to: to },
      { contactNumber: contactNumber },
      { contactEmail: contactEmail },
    ];

    const simplifiedCityData = cityTourDetailsData
      .filter((entry) => entry[Object.keys(entry)[0]] !== null)
      .map((entry) => {
        const key = Object.keys(entry)[0];
        const value = entry[key];
        return { key, value };
      });

    res.status(200).json({ success: true, data: simplifiedCityData });
  } catch (error) {
    console.error("Error processing the data:", error);
    res.status(400).json({ success: false, msg: "Get escort data error" });
  }
};

module.exports = { cityTourDetails };
