const { Appointment, Member } = require("../../models");
const Joi = require("joi");

const deleteAppointmentSchema = Joi.object({
  appointmentId: Joi.number().integer().positive().required(),
});

const del = async (req, res) => {
  try {
    const { error } = deleteAppointmentSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { appointmentId } = req.body;
    const memberId = req.user.id;

    const memberExists = await Member.findOne({ where: { user_id: memberId } });
    if (!memberExists) {
      return res
        .status(403)
        .json({ success: false, msg: "Only Member can delete an appointment" });
    }

    const appointment = await Appointment.update(
      { approval_status: "3" },
      { where: { id: appointmentId, member_id: memberId, approval_status: 0 } }
    );
    const [appointmentRawCount] = appointment;
    if (appointmentRawCount == 0) {
      return res.status(404).json({
        success: false,
        msg: "User Appointment is either not found or already approved. Not deleted.",
      });
    }
    res.status(200).json({
      success: true,
      msg: "User Appointment Deleted Successfully!",
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res
      .status(500)
      .json({ success: false, msg: "Delete User Appointment Error" });
  }
};

module.exports = { del };
