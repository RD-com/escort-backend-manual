const { createGallery } = require("./createGalleryController");
const { updateGallery } = require("./updateGalleryController");
const { deleteGallery } = require("./deleteGalleryController");
const { getAllGalleries } = require("./getAllGalleriesController");
const { getGallery } = require("./getGalleryController");
const { deleteImage } = require("./deleteImageController");
const { addImage } = require("./addImageController");

module.exports = {
  createGallery,
  updateGallery,
  deleteGallery,
  getAllGalleries,
  getGallery,
  deleteImage,
  addImage,
};
