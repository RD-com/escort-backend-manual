const {
  Escort,
  Users,
  EscortGallery,
  EscortGalleryMedia,
  UserPackage,
  Package,
} = require("../../models");
const Joi = require("joi");
const { Op, literal } = require("sequelize");

const searchSchema = Joi.object({
  name: Joi.string(),
});

const search = async (req, res) => {
  try {
    const { error } = searchSchema.validate(req.query);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }
    const { name } = req.query;
    const searchData = await Users.findAll({
      where: {
        [Op.or]: [
          literal(`LOWER("username") LIKE LOWER('%${name}%')`),
          literal(`LOWER("Escort"."name") LIKE LOWER('%${name}%')`),
        ],
        account_type_id: 2,
        is_email_verified: "1",
        is_account_verified: "1",
        is_disabled: "0",
        is_suspended: "0",
      },
      include: [
        {
          model: Escort,
          required: true,
          as: "Escort",
          attributes: ["name", "age", "city"],
        },
        {
          model: EscortGallery,
          attributes: ["id"],
          where: {
            type: "2",
            is_deleted: "0",
          },
          include: [
            {
              model: EscortGalleryMedia,
              attributes: ["url"],
              where: {
                media_type: "1",
                is_deleted: "0",
              },
              required: true,
              limit: 1,
            },
          ],
        },
        {
          model: UserPackage,
          attributes: ["id"],
          where: {
            status: "1",
          },
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: Package,
              attributes: ["name"],
            },
          ],
        },
      ],
      attributes: ["id", "username"],
    });

    if (searchData.length === 0) {
      return res
        .status(404)
        .json({ success: false, msg: "No search results found" });
    }
    const filteredEscorts = searchData.map((user) => {
      const escort = {
        id: user.id,
        username: user.username,
        name: null,
        age: null,
        city: null,
        url: null,
        packageName: null,
      };

      if (user.Escort) {
        escort.name = user.Escort.name;
        escort.age = user.Escort.age;
        escort.city = user.Escort.city;
      }

      if (
        user.EscortGalleries &&
        user.EscortGalleries.length > 0 &&
        user.EscortGalleries[0].EscortGalleryMedia
      ) {
        escort.url = user.EscortGalleries[0].EscortGalleryMedia[0]?.url || null;
      }

      if (
        user.UserPackages &&
        user.UserPackages.length > 0 &&
        user.UserPackages[0].Package
      ) {
        escort.packageName = user.UserPackages[0].Package.name;
      }

      return escort;
    });

    const sortingOrder = [
      "King/Queen of the Day",
      "Spotlight",
      "Diamond",
      "Gold",
      "Silver",
    ];

    filteredEscorts.sort((a, b) => {
      return (
        sortingOrder.indexOf(a.packageName) -
        sortingOrder.indexOf(b.packageName)
      );
    });

    res.status(200).json({ success: true, escorts: filteredEscorts });
  } catch (error) {
    console.error("Error processing the data:", error);
    res.status(500).json({ success: false, msg: "Search data error" });
  }
};

module.exports = { search };
