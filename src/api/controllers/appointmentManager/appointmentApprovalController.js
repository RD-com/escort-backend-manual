const { where } = require("sequelize");
const {
  Appointment,
  UserPackage,
  PackageFeature,
  Limitation,
} = require("../../models");
const Joi = require("joi");

const approvalSchema = Joi.object({
  appointmentId: Joi.number().integer().positive().required(),
  approvalStatus: Joi.number().valid(1, 2).required(),
});

const approval = async (req, res) => {
  try {
    const { error } = approvalSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }
    const { appointmentId, approvalStatus } = req.body;

    const escortId = req.user.id;

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
      await Limitation.update(
        { is_exceeded: "1" },
        {
          where: {
            user_id: escortId,
            type: "1",
          },
        }
      );
      return res.status(403).json({
        success: false,
        msg: "You have reached the maximum limit of appointments based on your package.You cannot approve any more.",
      });
    }

    const appointment = await Appointment.update(
      { approval_status: approvalStatus },
      { where: { id: appointmentId, approval_status: 0 } }
    );
    const [appointmentRawCount] = appointment;

    if (approvalStatus === 1 && appointmentRawCount > 0) {
      return res.status(200).json({
        success: true,
        msg: "User Appointment Approved Successfully!",
      });
    } else if (approvalStatus === 2 && appointmentRawCount > 0) {
      return res.status(200).json({
        success: true,
        msg: "User Appointment Rejected Successfully!",
      });
    }
    return res
      .status(404)
      .json({ success: false, msg: "Appointment not found!" });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({
      success: false,
      msg: "Approve Or Reject Service Provider Appointment Error",
    });
  }
};

module.exports = { approval };
