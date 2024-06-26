const { Users, Member } = require("../../../../models");
const Joi = require("joi");

const enableSchema = Joi.object({
  type: Joi.number().integer().valid(1, 2).required(),
});
/*
    1-disabled
    2-enabled
*/
const getDisabledAccounts = async (req, res) => {
  try {
    const { error } = enableSchema.validate(req.query);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }
    const { type } = req.query;

    let whereclause = {
      account_type_id: 1,
    };

    switch (type) {
      case "1":
        whereclause.is_disabled = "1";
        break;
      case "2":
        whereclause.is_disabled = "0";
        break;
      default:
        break;
    }
    const userData = await Users.findAll({
      where: whereclause,
      include: [
        {
          model: Member,
          attributes: ["name"],
        },
      ],
    });

    if (userData.length === 0) {
      return res.status(404).json({ success: false, msg: "No accounts found" });
    }

    const disabledData = userData.map((data) => {
      const memberDetails = data.Member
        ? data.Member.get({ plain: true })
        : null;

      return {
        memberId: data.id,
        name: memberDetails ? memberDetails.name : null,
        email: data.email,
        createdAt: data.created_at,
      };
    });

    const status = type === 1 ? "Disabled" : "Enabled";
    const responseData = { success: true };

    responseData[`${status}Members`] = disabledData;

    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

module.exports = { getDisabledAccounts };
