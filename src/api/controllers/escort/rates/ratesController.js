const { incallOutcallRates } = require("../../../models");
const Joi = require("joi");

/*
  {   
      "i_hour":,
      "i_additional_hour":,
      "i_dinner_date":,
      "i_weekend":,
      "i_overnight":,
      "i_full_day":,
      "o_hour":,
      "o_additional_hour":,
      "o_dinner_date",
      "o_weekend",
      "o_overnight",
      "o_full_day",
  }
*/

const ratesSchema = Joi.object({
  i_hour: Joi.number().integer(),
  i_additional_hour: Joi.number().integer(),
  i_dinner_date: Joi.number().integer(),
  i_weekend: Joi.number().integer(),
  i_overnight: Joi.number().integer(),
  i_full_day: Joi.number().integer(),
  o_hour: Joi.number().integer(),
  o_additional_hour: Joi.number().integer(),
  o_dinner_date: Joi.number().integer(),
  o_weekend: Joi.number().integer(),
  o_overnight: Joi.number().integer(),
  o_full_day: Joi.number().integer(),
});

const createRates = async (req, res) => {
  try {
    const { error } = ratesSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const {
      i_hour,
      i_additional_hour,
      i_dinner_date,
      i_weekend,
      i_overnight,
      i_full_day,
      o_hour,
      o_additional_hour,
      o_dinner_date,
      o_weekend,
      o_overnight,
      o_full_day,
    } = req.body;
    const userId = req.user.id;

    const ratesData = {
      user_id: userId,
      i_hour,
      i_additional_hour,
      i_dinner_date,
      i_weekend,
      i_overnight,
      i_full_day,
      o_hour,
      o_additional_hour,
      o_dinner_date,
      o_weekend,
      o_overnight,
      o_full_day,
    };

    await incallOutcallRates.upsert(ratesData);

    res
      .status(200)
      .json({ success: true, msg: "Rates Data received successfully" });
  } catch (error) {
    console.error("Error processing the data:", error);
    res.status(500).json({ success: false, msg: "Escort registration error" });
  }
};

module.exports = { createRates };
