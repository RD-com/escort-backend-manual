const {
  Escort,
  Users,
  EscortContactDetails,
  ContactInstructionLocalization,
  EscortSocialMedia,
  SocialMedia,
} = require("../../../models");
const Joi = require("joi");

const detailsSchema = Joi.object({
  language: Joi.string(),
  username: Joi.string().required(),
});

const contactDetails = async (req, res) => {
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
      attributes: ["id","email"],
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "User Does Not Exist" });
    }

    const userId = user.id;

    const contactData = await EscortContactDetails.findOne({
      where: {
        user_id: userId,
      },
      attributes: [
        ["contact_number", "contactNumber"],
        ["combination_id", "contactInstructionCombinationId"],
        ["address_club_name", "addressClubName"],
        ["address_street", "addressStreet"],
        ["address_nr", "addressNr"],
      ],
    });

    const { contactNumber, addressClubName, addressStreet, addressNr } =
      contactData.dataValues;

    const contactInstructionData = await ContactInstructionLocalization.findOne(
      {
        where: {
          language_code: language,
          combination_id:
            contactData.dataValues.contactInstructionCombinationId,
        },
        attributes: ["content"],
      }
    );

    const contactDetailsData = [
      { contactNumber: contactNumber },
      { contactInstruction: contactInstructionData.dataValues.content },
      { addressClubName: addressClubName },
      { addressStreet: addressStreet },
      { addressNr: addressNr },
    ];

    const socialMediaData = await EscortSocialMedia.findAll({
      where: {
        user_id: userId,
      },
      attributes: [
        ["social_media_id", "socialMediaId"],
        ["social_media_username", "socialMediaUsername"],
      ],
    });

    const social = await Promise.all(
      socialMediaData.map(async (data) => {
        const socialMedia = await SocialMedia.findOne({
          where: { id: data.dataValues.socialMediaId },
          attributes: ["name"],
        });
        return {
          key: socialMedia ? socialMedia.dataValues.name : null,
          value: data.dataValues.socialMediaUsername,
        };
      })
    );

    const simplifiedContactData = contactDetailsData
      .filter((entry) => entry[Object.keys(entry)[0]] !== null)
      .map((entry) => {
        const key = Object.keys(entry)[0];
        const value = entry[key];
        return { key, value };
      });

    simplifiedContactData.push(...social);

    simplifiedContactData.push({ key: 'email', value: user.email });

    res.status(200).json({ success: true, data: simplifiedContactData });
  } catch (error) {
    console.error("Error processing the data:", error);
    res.status(400).json({ success: false, msg: "Get escort data error" });
  }
};

module.exports = { contactDetails };
