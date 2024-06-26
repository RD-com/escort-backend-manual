const {
  Transaction,
  Wallet,
  UserPackage,
  Limitation,
} = require("../../../models");
const { Sequelize } = require("sequelize");

const performTransaction = async (userId, packageId, expireDate) => {
  try {
    if ([1, 2, 3].includes(packageId)) {
      await UserPackage.update(
        { status: "0" },
        {
          where: {
            user_id: userId,
            status: "1",
            package_id: {
              [Sequelize.Op.in]: [1, 2, 3],
            },
          },
        }
      );
      await Limitation.update(
        { is_exceeded: "0" },
        {
          where: {
            user_id: userId,
            type: "1",
          },
        }
      );
    }

    // Check if the user already has a package with the same package_id
    const existingPackage = await UserPackage.findOne({
      where: {
        user_id: userId,
        package_id: packageId,
      },
    });

    if (existingPackage) {
      // Update the existing package
      await existingPackage.update({
        expire_date: expireDate,
        status: "1",
      });
    } else {
      // Insert a new package
      await UserPackage.create({
        user_id: userId,
        package_id: packageId,
        expire_date: expireDate,
        status: "1",
      });
    }

    return true;
  } catch (error) {
    console.error("Transaction failed:", error.message);
    return false;
  }
};

module.exports = {
  performTransaction,
};
