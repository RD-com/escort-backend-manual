const { Pricing, UserPackage } = require("../../../models");
const { performTransaction } = require("./transactionController");
const { Sequelize } = require("sequelize");

const buySpotlightPackage = async (req, res) => {
  try {
    const userId = req.user.id;

    const pricingResult = await Pricing.findOne({
      where: { package_id: 4, time_period: "0" },
    });

    if (!pricingResult || !pricingResult.price) {
      return res.status(404).json({
        success: false,
        msg: "Package data not found for the provided packageId and timePeriod.",
      });
    }

    const { price } = pricingResult;

    const existingPackage = await UserPackage.findOne({
      where: {
        user_id: userId,
        status: "1",
        package_id: {
          [Sequelize.Op.in]: [1, 2, 3],
        },
      },
    });

    if (!existingPackage) {
      return res.status(403).json({
        success: false,
        msg: "User does not have any active main package.",
      });
    }

    await performTransaction(
      userId,
      price,
      (packageId = 4),
      (expireDate = null),
      res
    );
  } catch (error) {
    console.error("Error processing the data:", error);
    res.status(500).json({ success: false, msg: "Package data error" });
  }
};

module.exports = { buySpotlightPackage };
