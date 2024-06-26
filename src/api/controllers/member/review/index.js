const { createReview } = require("./createReviewController");
const { getReview } = require("./getReviewController");
const { deleteReview } = require("./deleteReviewController");

module.exports = { createReview, getReview, deleteReview };
