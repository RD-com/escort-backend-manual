const { EscortService } = require("../../../models");
const { getUniqueServiceCombinationIds } = require("../../combinationIds");

/*
  {
      "service": [
          {
              "serviceCombinationId":1,
              "rate": 100
          },
          {
              "serviceCombinationId":2 ,
              "rate": 150
          }
      ]
  }
*/

const Joi = require("joi");

const serviceSchema = Joi.object({
  service: Joi.array()
    .items(
      Joi.object({
        serviceCombinationId: Joi.number().integer().required(),
        rate: Joi.number().integer().required(),
      })
    )
    .required(),
});

const createService = async (req, res) => {
  try {
    const { error } = serviceSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { service } = req.body;
    const userId = req.user.id;

    try {
      await EscortService.destroy({
        where: {
          user_id: userId,
        },
      });

      const serviceCombinationIdArray = await getUniqueServiceCombinationIds();
      for (const data of service) {
        if (!serviceCombinationIdArray.includes(data.serviceCombinationId)) {
          return res.status(404).json({
            success: false,
            msg: "Service Offering Category That You Provided Not Found",
          });
        }
        const serviceData = {
          user_id: userId,
          combination_id: data.serviceCombinationId,
          rate: data.rate,
        };

        await EscortService.upsert(serviceData);
      }
      return res.status(200).json({
        success: true,
        msg: "Escort Service Data Created Successfully",
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

module.exports = { createService };
