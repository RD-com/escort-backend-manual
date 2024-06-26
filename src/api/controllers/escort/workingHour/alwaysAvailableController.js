const { EscortWorkingHour } = require("../../../models");
const { getUniqueDayCombinationIds } = require("../../combinationIds");
const Joi = require("joi");

const alwaysAvailableSchema = Joi.object({
  isAlwaysAvailable: Joi.boolean().valid(true),
});
const createAlwaysAvailable = async (req, res) => {
  try {
    const { error } = alwaysAvailableSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }
    const { isAlwaysAvailable } = req.body;
    const userId = req.user.id;

    try {
      if (!isAlwaysAvailable) {
        console.error("Error processing the data:", error);
        res.status(400).json({
          success: false,
          msg: "please check the checkbox before continue",
        });
      }
      const dayCombinationIdArray = await getUniqueDayCombinationIds();
      if (dayCombinationIdArray.length === 0) {
        return res.status(404).json({
          success: false,
          msg: " Working Day That You Provided Not Found",
        });
      }
      await EscortWorkingHour.destroy({
        where: { user_id: userId },
      });

      const workingHourData = {
        user_id: userId,
        combination_id: 8,
      };
      await EscortWorkingHour.upsert(workingHourData);

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

module.exports = { createAlwaysAvailable };
