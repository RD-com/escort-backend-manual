const { countProfileView } = require("./profileViewCountController");
const {
  countWhatsappNumberView,
} = require("./whatsappNumberViewCountController");
const { countFavourite } = require("./favouriteCountController");

module.exports = { countProfileView, countWhatsappNumberView, countFavourite };
