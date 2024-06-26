const { buyPrivateGallery } = require("./buyPrivateGalleryController");
const { getPrivateGallery } = require("./getPrivateGalleryController");
const { getAllBoughtGalleries } = require("./getAllPrivateGalleriesController");

module.exports = {
  buyPrivateGallery,
  getPrivateGallery,
  getAllBoughtGalleries,
};
