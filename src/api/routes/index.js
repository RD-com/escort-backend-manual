const auth = require("./authRoutes");
const appointment = require("./appointmentRoutes");
const ticket = require("./ticketRoutes");
const chat = require("./chatRoutes");
const escort = require("./escortRoutes");
const member = require("./memberRoutes");
const profile = require("./profileRoutes");
const form = require("./formRoutes");
const payment = require("./paymentRoutes");
const language = require("./languageRoutes");
const admin = require("./adminRoutes");
const mainSearch = require("./mainSearchRoutes");
const affiliate = require("./affiliateRoutes");

module.exports = {
  auth,
  appointment,
  ticket,
  chat,
  escort,
  profile,
  member,
  form,
  payment,
  language,
  admin,
  mainSearch,
  affiliate,
};
