const {
  Users,
  EscortLanguage,
  LanguageProficiency,
  Language,
} = require("../../../models");
const Joi = require("joi");

const detailsSchema = Joi.object({
  language: Joi.string(),
  username: Joi.string().required(),
});

const languageDetails = async (req, res) => {
  try {
    const { error } = detailsSchema.validate(req.query);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const username = req.query.username;

    const user = await Users.findOne({
      where: { username },
      attributes: ["id"],
    });

    const escortLanguages = await EscortLanguage.findAll({
      attributes: [["proficiency_id", "proficiencyId"]],
      where: { user_id: user.id },
      include: [
        {
          model: Language,
          attributes: ["name"],
        },
      ],
    });

    const escortLanguagesWithProficiency = await Promise.all(
      escortLanguages.map(async (escortLanguage) => {
        const proficiency = await LanguageProficiency.findOne({
          where: { id: escortLanguage.dataValues.proficiencyId },
          attributes: ["content"],
        });
        return {
          key: escortLanguage.Language.name,
          value: proficiency ? proficiency.dataValues.content : null,
        };
      })
    );

    res
      .status(200)
      .json({ success: true, data: escortLanguagesWithProficiency });
  } catch (error) {
    console.error("Error processing the data:", error);
    res.status(400).json({ success: false, msg: "Get escort data error" });
  }
};

module.exports = { languageDetails };
