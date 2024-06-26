const { EscortCityTour } = require("../../../models");
const { getUniqueCityCombinationIds } = require("../../combinationIds");
const Joi = require("joi");

const cityTourSchema = Joi.object({
  cityCombinationId: Joi.number().integer().required(),
  from: Joi.date().iso().required(),
  to: Joi.date().iso().required().greater(Joi.ref("from")).required(),
  contactNumber: Joi.string().required(),
  contactEmail: Joi.string().email().required(),
});

const createCityTour = async (req, res) => {
  try {
    const { error } = cityTourSchema.validate(req.body, { abortEarly: false });
    if (error) {
      console.error(
        "Validation Error:",
        error.details.map((detail) => detail.message)
      );
      return res.status(400).json({
        success: false,
        msg: error.details.map((detail) => detail.message),
      });
    }

    const { cityCombinationId, from, to, contactNumber, contactEmail } =
      req.body;
    const userId = req.user.id;

    try {
      await EscortCityTour.destroy({
        where: { user_id: userId },
      });

      const cityCombinationIdArray = await getUniqueCityCombinationIds();

      if (!cityCombinationIdArray.includes(cityCombinationId)) {
        return res
          .status(404)
          .json({ success: false, msg: "Invalid cityCombinationId" });
      }

      const tourData = {
        user_id: userId,
        combination_id: cityCombinationId,
        from,
        to,
        contact_number: contactNumber,
        contact_email: contactEmail,
      };

      await EscortCityTour.create(tourData);

      res.status(200).json({
        success: true,
        msg: "City tour created successfully",
      });
    } catch (error) {
      console.error("Error processing the data:", error);
      res.status(400).json({ success: false, msg: "Error creating city tour" });
    }
  } catch (error) {
    console.error("Error processing the data:", error);
    res.status(500).json({ success: false, msg: "Error creating city tour" });
  }
};

module.exports = { createCityTour };
