const { create } = require("./createTicketController");
const { get } = require("./getTicketController");
const { close } = require("./closeTicketController");

module.exports = { create, get, close };
