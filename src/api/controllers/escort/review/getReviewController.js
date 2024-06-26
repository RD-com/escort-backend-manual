const { Review, Users, Member } = require("../../../models");
const Joi = require("joi");

const getReviewsSchema = Joi.object({
  approvalStatus: Joi.number().integer().valid(0, 1, 2),
});

const getReview = async (req, res) => {
  try {
    const { error } = getReviewsSchema.validate(req.query);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { approvalStatus } = req.query;
    const escortId = req.user.id;

    const whereClause = {
      escort_id: escortId,
    };

    if (approvalStatus !== undefined) {
      whereClause["$Review.approval_status$"] = approvalStatus;
    } else {
      whereClause["$Review.approval_status$"] = {
        [Op.not]: "2",
      };
    }

    const reviewData = await Review.findAll({
      where: whereClause,
    });

    if (reviewData.length === 0) {
      return res
        .status(404)
        .json({ success: false, msg: "No reviews found for the escort" });
    }

    const reviews = await Promise.all(
      reviewData.map(async (data) => {
        const memberDetails = await Member.findOne({
          where: { user_id: data.dataValues.member_id },
        });

        const userDetails = await Users.findOne({
          where: { id: data.dataValues.member_id },
        });

        const memberEmail = userDetails ? userDetails.dataValues.email : null;
        const memberName = memberDetails ? memberDetails.dataValues.name : null;

        const reviewsObj = {
          memberName,
          memberEmail,
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
