const { EscortSocialContact, Users } = require("../../../models");
const Joi = require("joi");

/*
  {
      "socialContact": {
        "1": "lorem",
        "2": "lorem",
        "3": "lorem",
        "4": "lorem"
      }
  }
*/

const SocialContactSchema = Joi.object({
  username: Joi.string().required(),
});

const getAllSocialContact = async (req, res) => {
  try {
    const { error } = SocialContactSchema.validate(req.query);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { username } = req.query;

    const user = await Users.findOne({
      where: { username },
      attributes: ["id"],
    });

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    const userId = user.id;

    try {
      const data = await EscortSocialContact.findAll({
        where: { user_id: userId },
        attributes: ["type", "content"],
      });

      const transformedData = {};
      data.forEach((entry) => {
        transformedData[entry.type] = entry.content;
      });

      return res.status(200).json({ success: true, defaults: transformedData });
    } catch (error) {
      console.error("Error processing the data:", error);
      res.status(400).json({ success: false, msg: "Get social contact error" });
    }
  } catch (error) {
    console.error("Error processing the data:", error);
    res
      .status(500)
      .json({ success: false, msg: "Get social contact data error" });
  }
};

module.exports = { getAllSocialContact };
