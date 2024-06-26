const {
  EscortStories,
  UserPackage,
  PackageFeature,
} = require("../../../models");

const getStories = async (req, res) => {
  try {
    const escortId = req.user.id;

    const escortPackage = await UserPackage.findOne({
      where: { user_id: escortId, status: "1" },
      attribattributes: ["package_id"],
    });

    const packageFeature = await PackageFeature.findOne({
      where: {
        package_id: escortPackage.package_id,
        combination_id: 4,
      },
      attributes: ["count"],
    });

    if (!escortPackage || !packageFeature) {
      return res.status(404).json({
        success: false,
        msg: "User package or package features not found",
      });
    }

    const escortStories = await EscortStories.findAll({
      where: {
        user_id: escortId,
        is_deleted: "0",
      },
      attributes: ["url", "posted_at"],
      order: [["posted_at", "DESC"]],
      limit: packageFeature.count,
    });

    if (escortStories.length === 0) {
      return res.status(404).json({
        success: false,
        msg: "Escort does not have any stories.",
      });
    }
    const stories = escortStories.map((data) => ({
      url: data.url,
      postedAt: data.posted_at,
    }));

    return res.status(200).json({ success: true, stories });
  } catch (error) {
    console.error("Error fetching escort stories:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Get escort stories data error" });
  }
};

module.exports = { getStories };
