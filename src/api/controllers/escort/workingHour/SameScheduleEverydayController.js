const { EscortWorkingHour } = require("../../../models");
const { getUniqueDayCombinationIds } = require("../../combinationIds");
const Joi = require("joi");
/*
  {
      "from": "08:00",
      "to": "12:00"
  }
*/

const sameScheduleEverydaySchema = Joi.object({
  from: Joi.string()
    .regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
    .label("Start time"),
  to: Joi.string()
    .regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
    .label("End time"),
  isNightEscort: Joi.boolean().valid(true, false),
}).custom((doc, helpers) => {
  if (doc.from > doc.to) {
    throw new Error("From time should be lower than To time!");
  }
  return doc;
});

const createSameScheduleEveryday = async (req, res) => {
  try {
    const { error } = sameScheduleEverydaySchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { from, to, isNightEscort } = req.body;
    const userId = req.user.id;

    try {
      const dayCombinationIdArray = await getUniqueDayCombinationIds();
      if (dayCombinationIdArray.length === 0) {
        return res.status(404).json({
          success: false,
          msg: " Working Day That You Provided Not Found",
        });
      }
      await EscortWorkingHour.destroy({
        where: { user_id: userId, combination_id: 8 },
      });

      for (const dayId of dayCombinationIdArray) {
        if (dayId > 7) break;

        const workingHourData = {
          user_id: userId,
          combination_id: dayId,
          from,
          to,
          is_night_escort: isNightEscort,
        };
        await EscortWorkingHour.upsert(workingHourData);
      }

      res.status(200).json({
        success: true,
        msg: "Working Hour Data created successfully",
      });
    } catch (error) {
      console.error("Error processing the data:", error);
      res
        .status(400)
        .json({ success: false, msg: "Escort registration error" });
    }
  } catch (error) {
    console.error("Error processing the data:", error);
    res.status(500).json({ success: false, msg: "Escort registration error" });
  }
};

module.exports = { createSameScheduleEveryday };
