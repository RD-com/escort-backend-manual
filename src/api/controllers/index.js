const auth = require("./auth");
const profile = require("./profile");
const ticket = require("./supportTicketManager");
const appointment = require("./appointmentManager");
const chat = require("./chat");
const escort = require("./escort");
const member = require("./member");
const form = require("./formController");
const language = require("./getLanguage");
const admin = require("./admin");
const mainSearch = require("./mainSearch");
const affiliate = require("./affiliate");
const transaction = require("./transactions");

module.exports = {
  auth,
  profile,
  ticket,
  appointment,
  chat,
  escort,
  member,
  form,
  language,
  admin,
  mainSearch,
  affiliate,
  transaction,
};
