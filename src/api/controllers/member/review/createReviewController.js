const { Review } = require("../../../models");
const Joi = require("joi");
const { startOfDay, endOfDay } = require("date-fns");
const { Op } = require("sequelize");

const createReviewSchema = Joi.object({
  escortId: Joi.string().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  description: Joi.string().allow(null, "").optional(),
});

const startOfToday = startOfDay(new Date());
const endOfToday = endOfDay(new Date());

const createReview = async (req, res) => {
  try {
    const { error } = createReviewSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { escortId, rating, description } = req.body;
    const memberId = req.user.id;

    const existingReviews = await Review.count({
      where: {
        member_id: memberId,
        escort_id: escortId,
        created_at: {
          [Op.between]: [startOfToday, endOfToday],
        },
      },
    });

    if (existingReviews >= 5) {
      return res.status(403).json({
        success: false,
        msg: "Daily Review Limit Exeeded",
      });
    }

    await Review.create({
      rating,
      description,
      member_id: memberId,
      escort_id: escortId,
      approval_status: "1",
    });

    res.status(201).json({
      success: true,
      msg: "Review created successfully",
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res
      .status(error.status || 500)
      .json({ success: false, msg: error.message || "Review creation error" });
  }
};

module.exports = { createReview };
