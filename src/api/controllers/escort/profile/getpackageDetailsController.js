const { Users, UserPackage, Package } = require("../../../models");
const Joi = require("joi");

const detailsSchema = Joi.object({
  username: Joi.string().required(),
});

const packageDetails = async (req, res) => {
  try {
    const { error } = detailsSchema.validate(req.query);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const username = req.query.username;

    const userWithPackages = await Users.findOne({
      where: { username },
      attributes: ["id"],
      include: [
        {
          model: UserPackage,
          as: "UserPackages",
          where: { status: "1" },
          attributes: ["package_id"],
          include: [
            {
              model: Package,
              attributes: ["name"],
            },
          ],
          order: [["id", "DESC"]],
          limit: 1,
        },
      ],
    });

    const packageName = userWithPackages.UserPackages[0].Package.name;

    res.status(200).json({ success: true, data: packageName });
  } catch (error) {
    console.error("Error processing the data:", error);
    res.status(400).json({ success: false, msg: "Get escort data error" });
  }
};

module.exports = { packageDetails };
