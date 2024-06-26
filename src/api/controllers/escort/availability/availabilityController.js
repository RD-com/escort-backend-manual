const { EscortAvailability } = require("../../../models");
const {
  getUniqueIncallCombinationIds,
  getUniqueOutcallCombinationIds,
} = require("../../combinationIds");

const Joi = require("joi");

const availabilitySchema = Joi.object({
  incallCombinationId: Joi.number().integer().optional(),
  outcallCombinationId: Joi.number().integer().optional(),
});

const createAvailability = async (req, res) => {
  try {
    const { error } = availabilitySchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { incallCombinationId, outcallCombinationId } = req.body;
    const userId = req.user.id;

    try {
      if (
        (incallCombinationId &&
          !(await getUniqueIncallCombinationIds()).includes(
            incallCombinationId
          )) ||
        (outcallCombinationId &&
          !(await getUniqueOutcallCombinationIds()).includes(
            outcallCombinationId
          ))
      ) {
        return res.status(404).json({
          success: false,
          msg: "Availability Data that you provided not found",
        });
      }

      const availabilityData = {
        user_id: userId,
        incall_combination_id: incallCombinationId || "",
        outcall_combination_id: outcallCombinationId || "",
      };
      const test = await EscortAvailability.upsert(availabilityData);

      return res.status(200).json({
        success: true,
        msg: "Availability Created Successfully",
        aaa: test,
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

module.exports = { createAvailability };
