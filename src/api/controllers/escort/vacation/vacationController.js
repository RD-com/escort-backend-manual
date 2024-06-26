const { EscortVacation } = require("../../../models");
const Joi = require("joi");

const VacationSchema = Joi.object({
  from: Joi.date().iso().required(),
  to: Joi.date().iso().required().greater(Joi.ref("from")),
});

const createVacation = async (req, res) => {
  try {
    const { error } = await VacationSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { from, to } = req.body;
    const userId = req.user.id;

    const vacationData = {
      user_id: userId,
      from,
      to,
    };

    await EscortVacation.upsert(vacationData);

    return res
      .status(201)
      .json({ success: true, msg: "Vacation created successfully" });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Escort registration error" });
  }
};

module.exports = { createVacation };
