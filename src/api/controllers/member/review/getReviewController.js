const { Review, Appointment, Users, Escort } = require("../../../models");
const Joi = require("joi");
const { Op, where } = require("sequelize");

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
    const memberId = req.user.id;

    const whereClause = {
      member_id: memberId,
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
        .json({ success: false, msg: "No reviews found for the member" });
    }
    const reviews = await Promise.all(
      reviewData.map(async (data) => {
        const escortDetails = await Escort.findOne({
          where: { user_id: data.escort_id },
          include: Users,
        });

        const escortEmail = escortDetails ? escortDetails.User.email : null;

        const reviewsObj = {
          escortName: escortDetails ? escortDetails.name : null,
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
