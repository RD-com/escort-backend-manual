const { EscortWorkingCity } = require("../../../models");
const { getUniqueCityCombinationIds } = require("../../combinationIds");
/*
    {
    "city": [1,2,3]
    }
*/

const Joi = require("joi");

const workingCitySchema = Joi.object({
  city: Joi.array().items(Joi.number().integer()).required(),
});

const createWorkingCity = async (req, res) => {
  try {
    const { error } = workingCitySchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { city } = req.body;
    const userId = req.user.id;

    try {
      await EscortWorkingCity.destroy({
        where: {
          user_id: userId,
        },
      });

      const combinationIdArray = await getUniqueCityCombinationIds();
      const invalidCombinationIds = city
        .filter((data) => !combinationIdArray.includes(data))
        .map((data) => data);

      if (invalidCombinationIds.length > 0) {
        return res.status(404).json({
          success: false,
          msg: "City combinationId not found",
        });
      }
      const cityDataDataArray = city.map((combinationId) => ({
        user_id: userId,
        combination_id: combinationId,
      }));
      await EscortWorkingCity.bulkCreate(cityDataDataArray);
      return res
        .status(200)
        .json({ success: true, msg: "Working City Created Successfully" });
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

module.exports = { createWorkingCity };
