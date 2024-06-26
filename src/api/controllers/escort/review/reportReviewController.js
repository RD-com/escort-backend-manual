const { Review } = require("../../../models");
const Joi = require("joi");

const reportReviewSchema = Joi.object({
  reviewId: Joi.number().integer().positive().required(),
});

const reportReview = async (req, res) => {
  try {
    const { error } = reportReviewSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { reviewId } = req.body;

    const [affectedRows] = await Review.update(
      {
        approval_status: "0",
      },
      {
        where: {
          id: reviewId,
          approval_status: "1",
        },
      }
    );

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        msg: "Reviews not found",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Review reported successfully",
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res
      .status(error.status || 500)
      .json({ success: false, msg: error.message || "Review reported error" });
  }
};

module.exports = { reportReview };
