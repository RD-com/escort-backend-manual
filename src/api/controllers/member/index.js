const { createBasicBio, getBasicBio } = require("./basicBio");
const { createReview, getReview, deleteReview } = require("./review");
const {
  buyPrivateGallery,
  getPrivateGallery,
  getAllBoughtGalleries,
} = require("./gallery");
const { addFavorite, getFavorite, isFavorite } = require("./favourite");

module.exports = {
  createBasicBio,
  getBasicBio,
  buyPrivateGallery,
  getPrivateGallery,
  getAllBoughtGalleries,
  createReview,
  getReview,
  deleteReview,
  addFavorite,
  getFavorite,
  isFavorite,
};
