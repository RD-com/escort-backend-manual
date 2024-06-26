const { create } = require("./createAppointmentController");
const { get } = require("./getAppointmentController");
const { del } = require("./deleteAppointmentController");
const { approval } = require("./appointmentApprovalController");

module.exports = { create, get, del, approval };
