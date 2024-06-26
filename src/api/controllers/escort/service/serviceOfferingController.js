const { ServiceOfferingCategory, Escort } = require("../../../models");
const {
  getUniqueServiceOfferingCategoryCombinationIds,
  getUniqueSexualOrientationCombinationIds,
} = require("../../combinationIds");

/*
    {
    "sexualOrientationId":1,
    "offeringCategoryIds": [1,2,3]
    }
*/

const Joi = require("joi");

const serviceOfferingSchema = Joi.object({
  sexualOrientationId: Joi.number().integer().required(),
  offeringCategoryIds: Joi.array().items(Joi.number().integer()).required(),
});

const createServiceOfferingCategory = async (req, res) => {
  try {
    const { error } = serviceOfferingSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { sexualOrientationId, offeringCategoryIds } = req.body;
    const userId = req.user.id;

    try {
      await ServiceOfferingCategory.destroy({
        where: {
          user_id: userId,
        },
      });

      const offeringCategorryCombinationIdArray =
        await getUniqueServiceOfferingCategoryCombinationIds();
      const sexualOrientationCombinationIdArray =
        await getUniqueSexualOrientationCombinationIds();

      const invalidCombinationIds =
        offeringCategoryIds === undefined
          ? undefined
          : offeringCategoryIds.every((code) =>
              offeringCategorryCombinationIdArray.includes(code)
            );

      if (
        (invalidCombinationIds || invalidCombinationIds === undefined) &&
        (!sexualOrientationId ||
          sexualOrientationCombinationIdArray.includes(sexualOrientationId))
      ) {
        const sexualOrientationData = {
          user_id: userId,
          sexual_orientation_id: sexualOrientationId,
        };

        await Escort.upsert(sexualOrientationData);

        const offeringCategoryPromises = invalidCombinationIds
          ? offeringCategoryIds.map(async (offeringCategoryId) => {
              const offeringCategoryData = {
                user_id: userId,
                offering_category_id: offeringCategoryId,
              };
              await ServiceOfferingCategory.upsert(offeringCategoryData);
            })
          : [];

        await Promise.all([...offeringCategoryPromises]);

        return res.status(200).json({
          success: true,
          msg: "Escort Service Offered Created Successfully",
        });
      }
      console.error("Error processing the data:", error);
      res
        .status(404)
        .json({ success: false, msg: "Escort Service Offered data not found" });
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

module.exports = { createServiceOfferingCategory };
