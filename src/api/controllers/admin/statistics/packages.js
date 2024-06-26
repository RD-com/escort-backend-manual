const { Package, UserPackage, Transaction } = require("../../../models");

const getPackages = async (req, res) => {
  try {
    const packages = await Package.findAll({ attributes: ["id"] });
    const packageIds = packages.map((pkg) => pkg.dataValues.id);

    const packageCounts = await Promise.all(
      packageIds.map(async (id) => {
        const count = await UserPackage.count({ where: { package_id: id } });
        return { packageId: id, count };
      })
    );

    const packageEarning = await Transaction.sum("amount", {
      where: { reason: "Buy Package" },
    });

    res.status(200).json({
      success: true,
      packageCounts,
      packageEarning,
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ success: false, msg: "Get Members Count Error" });
  }
};

module.exports = { getPackages };
