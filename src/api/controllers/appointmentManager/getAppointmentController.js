const { Appointment, Users, Member, Escort } = require("../../models");
const Joi = require("joi");
const { Op } = require("sequelize");

const viewAppointmentSchema = Joi.object({
  status: Joi.string().valid("0", "1", "2", "3"),
});

const get = async (req, res) => {
  try {
    const { error } = viewAppointmentSchema.validate(req.query);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { status } = req.query;
    const userId = req.user.id;

    const whereClause = {
      [Op.or]: [{ member_id: userId }, { escort_id: userId }],
    };

    if (status !== undefined) {
      whereClause.approval_status = status;
    } else {
      whereClause.approval_status = {
        [Op.not]: "3",
      };
    }

    const appointmentData = await Appointment.findAll({
      where: whereClause,
      attributes: ["id", "member_id", "escort_id", "date", "approval_status"],
    });

    if (appointmentData.length === 0) {
      return res
        .status(404)
        .json({ success: false, msg: "User Appointments not found!" });
    }
    const appointments = await Promise.all(
      appointmentData.map(async (appointment) => {
        const user = await Users.findByPk(appointment.member_id);
        const member = await Member.findOne({
          where: { user_id: appointment.member_id },
        });
        const escort = await Escort.findOne({
          where: { user_id: appointment.escort_id },
        });

        const appointmentObj = {
          ...appointment.dataValues,
          memberName: member ? member.name : null,
          escortName: escort ? escort.name : null,
          email: user ? user.email : null,
        };

        return appointmentObj;
      })
    );
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res
      .status(500)
      .json({ success: false, msg: "View User Appointment Error" });
  }
};

module.exports = { get };
