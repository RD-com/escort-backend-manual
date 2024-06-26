const { Review, Users } = require("../../../models");

const getReview = async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      where: {
        approval_status: "0",
      },
    });

    if (reviewData.length === 0) {
      return res.status(404).json({ success: false, msg: "No reviews found" });
    }

    const reviews = await Promise.all(
      reviewData.map(async (data) => {
        const memberDetails = await Users.findOne({
          where: { id: data.dataValues.member_id },
        });
        const escortDetails = await Users.findOne({
          where: { id: data.dataValues.escort_id },
        });

        const memberEmail = memberDetails
          ? memberDetails.dataValues.email
          : null;
        const escortEmail = escortDetails
          ? escortDetails.dataValues.email
          : null;

        const reviewsObj = {
          memberEmail,
          escortEmail,
          rating: data.dataValues.rating,
          description: data.dataValues.description,
          reviewApprovalStatus: data.dataValues.approval_status,
          createdAt: data.dataValues.created_at,
        };

        return reviewsObj;
      })
    );

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

module.exports = { getReview };
