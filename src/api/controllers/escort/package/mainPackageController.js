const { Pricing, UserPackage } = require("../../../models");
const { Sequelize } = require("sequelize");
const { performTransaction } = require("./transactionController");

const calculateExpirationDate = (timePeriod) => {
  const dayCountMapping = {
    1: 1,
    2: 7,
    3: 30,
    4: 365,
  };
  const dayCount = dayCountMapping[timePeriod] || 0;
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + dayCount);
  return expirationDate;
};

const buyMainPackage = async (userId, packageId, timePeriod) => {
  try {
    const pricingResult = await Pricing.findOne({
      where: { package_id: packageId, time_period: timePeriod },
    });

    if (!pricingResult || !pricingResult.price) {
      return res.status(404).json({
        success: false,
        msg: "Package data not found for the provided packageId and timePeriod.",
      });
    }

    const existingPackage = await UserPackage.findOne({
      where: {
        user_id: userId,
        status: "1",
        package_id: {
          [Sequelize.Op.in]: [1, 2, 3],
        },
      },
    });

    const newExpireDate = calculateExpirationDate(timePeriod);
    if (existingPackage) {
      const existingPackageExpireDate = new Date(existingPackage.expire_date);

      if (
        existingPackage.package_id >= packageId &&
        existingPackageExpireDate > newExpireDate
      ) {
        return res.status(403).json({
          success: false,
          msg: "Cannot buy a lower-tier package until the current one expires.",
        });
      }

      if (existingPackage.package_id > packageId) {
        return res.status(403).json({
          success: false,
          msg: "Cannot buy a lower-tier package than the existing one.",
        });
      }
    }
    await performTransaction(userId, packageId, newExpireDate);
  } catch (error) {
    console.error("Error processing the data:", error);
    res.status(500).json({ success: false, msg: "Package data error" });
  }
};

module.exports = { buyMainPackage };
