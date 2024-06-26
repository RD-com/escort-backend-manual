const { EscortWorkingHour } = require("../../../models");
const { getUniqueDayCombinationIds } = require("../../combinationIds");
const Joi = require("joi");

const customScheduleSchema = Joi.object({
  workingHour: Joi.array()
    .items(
      Joi.object({
        combinationId: Joi.number().integer().required(),
        from: Joi.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
        to: Joi.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
        isNightEscort: Joi.boolean().valid(true, false),
      })
    )
    .max(7)
    .required(),
}).custom((doc, helpers) => {
  if (doc.from > doc.to) {
    throw new Error("From time should be lower than To time!");
  }
  return doc;
});

const createCustomSchedule = async (req, res) => {
  try {
    const { error } = customScheduleSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { workingHour } = req.body;
    const userId = req.user.id;

    try {
      await EscortWorkingHour.destroy({
        where: { user_id: userId },
      });

      const dayCombinationIdArray = await getUniqueDayCombinationIds();
      const hasInvalidCombinationId = workingHour.some(
        (data) => data.combinationId > 7
      );

      const invalidDayCombinationIds = workingHour
        .filter((data) => !dayCombinationIdArray.includes(data.combinationId))
        .map((data) => data.combinationId);

      if (invalidDayCombinationIds.length > 0 || hasInvalidCombinationId) {
        return res.status(404).json({
          success: false,
          msg: " Working Day That You Provided Not Found",
        });
      }

      const workingHourData = workingHour.map((data) => ({
        user_id: userId,
        combination_id: data.combinationId,
        from: data.from,
        to: data.to,
        is_night_escort: data.isNightEscort,
      }));

      const upsertPromises = workingHourData.map((data) =>
        EscortWorkingHour.upsert(data, { updateOnDuplicate: ["from", "to"] })
      );

      const excludedCombinationId = 8;
      const missingCombinationIds = dayCombinationIdArray.filter(
        (id) =>
          id !== excludedCombinationId &&
          !workingHourData.some((data) => data.combination_id === id)
      );

      const missingCombinationData = missingCombinationIds.map((id) => ({
        user_id: userId,
        combination_id: id,
        from: null,
        to: null,
      }));

      const upsertMissingPromises = missingCombinationData.map((data) =>
        EscortWorkingHour.upsert(data, { updateOnDuplicate: ["from", "to"] })
      );

      await Promise.all([...upsertPromises, ...upsertMissingPromises]);

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

module.exports = { createCustomSchedule };
