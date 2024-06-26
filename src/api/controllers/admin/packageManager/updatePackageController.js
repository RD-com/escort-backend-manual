const {
  Pricing,
  PackageFeature,
  FeatureLocalization,
} = require("../../../models");
const Joi = require("joi");

const packageSchema = Joi.object({
  packageId: Joi.number().integer().required(),
  pricings: Joi.array().items(
    Joi.object({
      timePeriod: Joi.string().valid("1", "2", "3", "4").required(),
      price: Joi.number().integer().required(),
    })
  ),
  PackageFeatures: Joi.array().items(
    Joi.object({
      combinationId: Joi.number().integer().required(),
      count: Joi.number().integer().required(),
      descriptions: Joi.array()
        .items(
          Joi.object({
            languageCode: Joi.string().required(),
            description: Joi.string().required(),
          })
        )
        .required(),
    })
  ),
}).or("pricings", "PackageFeatures");

const updatePackage = async (req, res) => {
  try {
    const { error } = packageSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }
    const { packageId, pricings, PackageFeatures } = req.body;

    if (pricings) {
      await Promise.all(
        pricings.map(async (pricing) => {
          const { timePeriod, price } = pricing;
          await Pricing.update(
            { price },
            { where: { package_id: packageId, time_period: timePeriod } }
          );
        })
      );
    }

    if (PackageFeatures) {
      await Promise.all(
        PackageFeatures.map(async (item) => {
          const { combinationId, count, descriptions } = item;
          await PackageFeature.update(
            { count },
            { where: { combination_id: combinationId } }
          );
          await Promise.all(
            descriptions.map(async (desc) => {
              const { languageCode, description } = desc;
              await FeatureLocalization.update(
                { description },
                {
                  where: {
                    combination_id: combinationId,
                    language_code: languageCode,
                  },
                }
              );
            })
          );
        })
      );
    }

    res.status(200).json({
      success: true,
      msg: "Package updated successfully",
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({
      success: false,
      msg: "Package update Error",
    });
  }
};

module.exports = { updatePackage };
