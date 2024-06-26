const {
  Users,
  EscortService,
  ServiceLocalization,
} = require("../../../models");
const Joi = require("joi");

const detailsSchema = Joi.object({
  language: Joi.string(),
  username: Joi.string().required(),
});

const serviceDetails = async (req, res) => {
  try {
    const { error } = detailsSchema.validate(req.query);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const username = req.query.username;
    const language = req.query.language || "EN";

    const serviceData = await Users.findAll({
      where: { username },
      attributes: ["id"],

      include: [
        {
          model: EscortService,
          attributes: [["combination_id", "combinationId"], "rate"],
        },
      ],
    });

    if (!serviceData) {
      return res
        .status(400)
        .json({ success: false, msg: "User Does Not Exist" });
    }

    const escortServices = await Promise.all(
      serviceData.map(async (data) => {
        const services = data.dataValues.EscortServices;
        if (!services || !services.length) return [];

        const serviceWithRate = await Promise.all(
          services.map(async (service) => {
            const servicesData = await ServiceLocalization.findOne({
              where: {
                combination_id: service.dataValues.combinationId,
                language_code: language,
              },
              attributes: ["content"],
            });
            return {
              key: servicesData ? servicesData.dataValues.content : null,
              value: service.dataValues.rate,
            };
          })
        );

        return serviceWithRate.filter(Boolean);
      })
    );

    const flattenedData = escortServices.flat();

    res.status(200).json({ success: true, data: flattenedData });
  } catch (error) {
    console.error("Error processing the data:", error);
    res.status(400).json({ success: false, msg: "Get escort data error" });
  }
};

module.exports = { serviceDetails };
