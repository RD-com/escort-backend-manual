const {
  Package,
  PackageFeature,
  FeatureLocalization,
  Pricing,
} = require("../../../models");

const getPackage = async (req, res) => {
  try {
    const packages = await Package.findAll({
      where: { id: [1, 2, 3] },
      include: [
        {
          model: PackageFeature,
          attributes: [["combination_id", "combinationId"], "count"],
        },
        {
          model: Pricing,
          attributes: [["time_period", "timePeriod"], "price"],
        },
      ],
      attributes: [["id", "packageId"], "name"],
    });

    const combinationIds = [
      ...new Set(
        packages.flatMap((pkg) =>
          pkg.PackageFeatures.map((feature) => feature.dataValues.combinationId)
        )
      ),
    ];

    const descriptions = await FeatureLocalization.findAll({
      where: { combination_id: combinationIds },
      attributes: ["combination_id", "language_code", "description"],
    });

    const descriptionMap = {};
    descriptions.forEach((desc) => {
      const { combination_id, language_code, description } = desc.dataValues;
      if (!descriptionMap[combination_id]) {
        descriptionMap[combination_id] = [];
      }
      descriptionMap[combination_id].push({
        description,
        languageCode: language_code,
      });
    });

    const packagesWithDescriptions = packages.map((pkg) => ({
      name: pkg.dataValues.name,
      packageId: pkg.dataValues.packageId,
      PackageFeatures: pkg.dataValues.PackageFeatures.map((feature) => ({
        combinationId: feature.dataValues.combinationId,
        count: feature.dataValues.count,
        descriptions: descriptionMap[feature.dataValues.combinationId] || [],
      })),
      pricings: pkg.dataValues.Pricings.map((pricing) => ({
        timePeriod: pricing.dataValues.timePeriod,
        price: pricing.dataValues.price,
      })),
    }));

    res.status(200).json({ success: true, packagesWithDescriptions });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ success: false, msg: "Package getting Error" });
  }
};

module.exports = { getPackage };
