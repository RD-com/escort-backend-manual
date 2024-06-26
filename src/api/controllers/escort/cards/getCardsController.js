const {
  EscortGallery,
  EscortGalleryMedia,
  Users,
  Escort,
  UserPackage,
  Package,
  EscortWorkingCity,
  EscortService,
  EscortLanguage,
  EscortAvailability,
  EscortPhysicalFeature,
  EscortAdditionalInformation,
  Limitation,
} = require("../../../models");
const Joi = require("joi");
const { Op } = require("sequelize");

const cardSchema = Joi.object({
  pageId: Joi.number().integer(),
  cityId: Joi.array().items(Joi.number().integer()).single(),
  gender: Joi.array().items(Joi.number().integer()).single(),
  package: Joi.array().items(Joi.number().integer()).single(),
  service: Joi.array().items(Joi.number().integer()).single(),
  incall: Joi.array().items(Joi.number().integer()).single(),
  outcall: Joi.array().items(Joi.number().integer()).single(),
  incall: Joi.array().items(Joi.number().integer()).single(),
  outcall: Joi.array().items(Joi.number().integer()).single(),
  sexualOrientation: Joi.array().items(Joi.number().integer()).single(),
  nationality: Joi.array().items(Joi.number().integer()).single(),
  hairColor: Joi.array().items(Joi.number().integer()).single(),
  hairLength: Joi.array().items(Joi.number().integer()).single(),
  eyeColor: Joi.array().items(Joi.number().integer()).single(),
  breast: Joi.array().items(Joi.number().integer()).single(),
  publicHair: Joi.array().items(Joi.number().integer()).single(),
  cupSize: Joi.array().items(Joi.string()).single(),
  language: Joi.array().items(Joi.string()).single(),
  isSmoking: Joi.number().valid().integer(),
  isDrinking: Joi.number().valid().integer(),
  isTatoos: Joi.number().valid().integer(),
  isPiercing: Joi.number().valid().integer(),
  minAge: Joi.number().valid().integer(),
  maxAge: Joi.number().valid().integer(),
  minHight: Joi.number().valid().integer(),
  maxHight: Joi.number().valid().integer(),
  minWeight: Joi.number().valid().integer(),
  maxWeight: Joi.number().valid().integer(),
});

const getCards = async (req, res) => {
  try {
    const { error } = cardSchema.validate(req.query);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const page = req.query.pageId || 1;
    const perPage = 12;

    const {
      cityId,
      service,
      incall,
      outcall,
      sexualOrientation,
      nationality,
      hairColor,
      hairLength,
      eyeColor,
      breast,
      publicHair,
      cupSize,
      isSmoking,
      isDrinking,
      isTatoos,
      isPiercing,
      minAge,
      maxAge,
      minHight,
      maxHight,
      maxWeight,
      minWeight,
      language,
    } = req.query;

    const userWhereCondition = {
      account_type_id: 2,
      is_email_verified: "1",
      is_account_verified: "1",
      is_disabled: "0",
      is_suspended: "0",
    };

    const include = [
      {
        model: Escort,
        attributes: ["name", "age", "city"],
        ...(req.query.gender && {
          where: {
            gender_combination_id: Array.isArray(req.query.gender)
              ? req.query.gender
              : [req.query.gender],
          },
        }),
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
          ...(req.query.package && {
            package_id: Array.isArray(req.query.package)
              ? req.query.package
              : [req.query.package],
          }),
        },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Package,
            attributes: ["name"],
          },
        ],
      },
      {
        model: Limitation,
        attributes: ["id"],
        where: {
          type: "1",
          is_exceeded: "0",
        },
      },
    ];

    await addFilterIf(cityId, include, EscortWorkingCity, "combination_id");
    await addFilterIf(service, include, EscortService, "combination_id");
    await addFilterIf(
      sexualOrientation,
      include,
      Escort,
      "sexual_orientation_id"
    );
    await addFilterIf(nationality, include, Escort, "nationality_id");
    await addFilterIf(
      incall,
      include,
      EscortAvailability,
      "incall_combination_id"
    );
    await addFilterIf(
      outcall,
      include,
      EscortAvailability,
      "outcall_combination_id"
    );
    await addFilterIf(
      hairColor,
      include,
      EscortPhysicalFeature,
      "hair_color_id"
    );
    await addFilterIf(
      hairLength,
      include,
      EscortPhysicalFeature,
      "hair_length_id"
    );
    await addFilterIf(eyeColor, include, EscortPhysicalFeature, "eye_color_id");
    await addFilterIf(breast, include, EscortPhysicalFeature, "breast_id");
    await addFilterIf(
      publicHair,
      include,
      EscortPhysicalFeature,
      "public_hair_id"
    );
    await addFilterIf(cupSize, include, EscortPhysicalFeature, "cup_size");
    await addFilterIf(
      isSmoking,
      include,
      EscortAdditionalInformation,
      "is_smoking"
    );
    await addFilterIf(
      isDrinking,
      include,
      EscortAdditionalInformation,
      "is_drinking"
    );
    await addFilterIf(
      isPiercing,
      include,
      EscortAdditionalInformation,
      "is_tatoos"
    );
    await addFilterIf(
      isTatoos,
      include,
      EscortAdditionalInformation,
      "is_piercing"
    );
    await addRangeFilter(minAge, maxAge, include, Escort, "age");
    await addRangeFilter(
      minHight,
      maxHight,
      include,
      EscortPhysicalFeature,
      "height"
    );
    await addRangeFilter(
      minWeight,
      maxWeight,
      include,
      EscortPhysicalFeature,
      "weight"
    );

    const escorts = await Users.findAll({
      where: userWhereCondition,
      attributes: ["id", "username"],
      include,
    });

    const filteredEscorts = escorts.map((user) => {
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

    const filteredEscortsWithoutNullData = filteredEscorts.filter((escort) => {
      return (
        escort.id !== null &&
        escort.username !== null &&
        escort.name !== null &&
        escort.age !== null &&
        escort.city !== null &&
        escort.packageName !== null &&
        escort.url !== null
      );
    });

    const sortingOrder = [
      "King/Queen of the Day",
      "Spotlight",
      "Diamond",
      "Gold",
      "Silver",
    ];

    filteredEscortsWithoutNullData.sort((a, b) => {
      return (
        sortingOrder.indexOf(a.packageName) -
        sortingOrder.indexOf(b.packageName)
      );
    });

    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedEscorts = filteredEscortsWithoutNullData.slice(
      startIndex,
      endIndex
    );

    res.status(200).json({ success: true, escorts: paginatedEscorts });
  } catch (error) {
    console.error("Error processing the data:", error);
    const status = error instanceof SyntaxError ? 400 : 500;
    return res.status(status).json({ success: false, msg: "Cards data error" });
  }
};

module.exports = { getCards };

async function addFilterIf(attributeIds, includeArray, model, attributeName) {
  return new Promise((resolve, reject) => {
    try {
      if (attributeIds !== undefined && attributeIds !== null) {
        const ids = Array.isArray(attributeIds) ? attributeIds : [attributeIds];
        includeArray.push({
          model: model,
          attributes: ["user_id"],
          where: {
            [attributeName]: ids,
          },
        });
      }
      resolve(includeArray);
    } catch (error) {
      reject(error);
    }
  });
}

async function addRangeFilter(min, max, includeArray, model, attributeName) {
  if (min !== undefined || max !== undefined) {
    const whereClause = {};
    if (min !== undefined) whereClause[attributeName] = { [Op.gte]: min };
    if (max !== undefined) {
      if (whereClause[attributeName]) {
        whereClause[attributeName][Op.lte] = max;
      } else {
        whereClause[attributeName] = { [Op.lte]: max };
      }
    }
    includeArray.push({
      model: model,
      attributes: ["user_id"],
      where: whereClause,
    });
  }
}
