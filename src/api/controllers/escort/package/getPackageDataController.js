const {
  Package,
  PackageFeature,
  FeatureLocalization,
  Pricing,
} = require("../../../models");

const getPackagesData = async (req, res) => {
  try {
    const languageCode = req.query.language || "EN";

    const packages = await Package.findAll({
      where: { id: [1, 2, 3] },
      include: [
        {
          model: PackageFeature,
          attributes: [["combination_id", "combinationId"]],
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
        packages.flatMap((package) =>
          package.PackageFeatures.map(
            (feature) => feature.dataValues.combinationId
          )
        )
      ),
    ];

    const descriptions = await FeatureLocalization.findAll({
      where: { combination_id: combinationIds, language_code: languageCode },
      attributes: ["combination_id", "description"],
    });

    packages.forEach((package) => {
      package.PackageFeatures.forEach((feature) => {
        const description = descriptions.find(
          (desc) => desc.combination_id === feature.dataValues.combinationId
        );
        feature.dataValues = description ? description.description : null;

        delete feature.dataValues.combinationId;
      });

      const pricings = {};
      package.dataValues.Pricings.forEach((pricing) => {
        pricings[pricing.dataValues.timePeriod] = pricing.dataValues.price;
      });
      package.dataValues.Pricings = pricings;
    });

    res.status(200).json({ success: true, packages });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ success: false, msg: "Package getting Error" });
  }
};

module.exports = { getPackagesData };
