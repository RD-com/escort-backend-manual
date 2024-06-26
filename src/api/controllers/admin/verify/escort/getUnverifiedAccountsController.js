const { Users, Escort, ApprovalStatus } = require("../../../../models");
const Joi = require("joi");

const verifySchema = Joi.object({
  type: Joi.number().integer().valid(1, 2, 3).required(),
});
/*
  1-newcomer
  2-settings modifiyed
  3-gallery modifiyed
*/
const getUnverifiedAccounts = async (req, res) => {
  try {
    const { error } = verifySchema.validate(req.query);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }
    const { type } = req.query;

    let verified = {};

    switch (type) {
      case "1":
        verified.is_newcomer_verified = "0";
        break;
      case "2":
        verified.is_settings_verified = "0";
        break;
      case "3":
        verified.is_gallery_verified = "0";
        break;
      default:
        break;
    }
    const userData = await Users.findAll({
      where: {
        is_account_verified: "0",
        account_type_id: 2,
      },
      include: [
        {
          model: Escort,
          attributes: ["name"],
        },
        {
          model: ApprovalStatus,
          where: verified,
        },
      ],
    });

    if (userData.length === 0) {
      return res
        .status(404)
        .json({ success: false, msg: "No unverified accounts found" });
    }

    const unverifiedData = userData.map((data) => {
      const escortDetails = data.Escort
        ? data.Escort.get({ plain: true })
        : null;

      return {
        escortId: data.id,
        name: escortDetails ? escortDetails.name : null,
        email: data.email,
        createdAt: data.created_at,
      };
    });

    res.status(200).json({ success: true, unverifiedData });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

module.exports = { getUnverifiedAccounts };
