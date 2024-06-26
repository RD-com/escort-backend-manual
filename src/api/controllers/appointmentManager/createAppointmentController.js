const {
  Appointment,
  Escort,
  Member,
  Users,
  UserPackage,
  PackageFeature,
} = require("../../models");
const Joi = require("joi");

const createAppointmentSchema = Joi.object({
  username: Joi.string().required(),
  appointmentDate: Joi.date().iso().greater("now").required(),
});

const create = async (req, res) => {
  try {
    const { error } = createAppointmentSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { username, appointmentDate } = req.body;
    const memberId = req.user.id;

    const escortIdData = await Users.findOne({
      where: { username },
      attributes: ["id"],
      include: [
        {
          model: Escort,
          attributes: ["user_id"],
        },
      ],
    });

    const memberExists = await Member.findOne({ where: { user_id: memberId } });
    if (!memberExists) {
      return res
        .status(403)
        .json({ success: false, msg: "Only Member can create an appointment" });
    }
    if (!escortIdData) {
      return res.status(404).json({ success: false, msg: "Escort Not Found" });
    }
    const escortId = escortIdData.dataValues.id;

    const escortPackage = await UserPackage.findOne({
      where: { user_id: escortId, status: "1" },
      attribattributes: ["package_id"],
    });

    const packageFeature = await PackageFeature.findOne({
      where: {
        package_id: escortPackage.package_id,
        combination_id: 5,
      },
      attributes: ["count"],
    });

    if (!escortPackage || !packageFeature) {
      return res.status(404).json({
        success: false,
        msg: "User package or package features not found",
      });
    }

    const appointmentCount = await Appointment.count({
      where: {
        escort_id: escortId,
        approval_status: "1",
      },
    });
    if (appointmentCount >= packageFeature.count) {
      return res.status(403).json({
        success: false,
        msg: "Escort has reached the maximum limit of appointments based on their package. So you cannot create more.",
      });
    }

    const appointmentData = {
      member_id: memberId,
      escort_id: escortId,
      date: appointmentDate,
      approval_status: "0",
    };

    await Appointment.create(appointmentData);

    res
      .status(200)
      .json({ success: true, msg: "User Appointment Created Successfully!" });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res
      .status(500)
      .json({ success: false, msg: "User Create Appointment Error" });
  }
};

module.exports = { create };
