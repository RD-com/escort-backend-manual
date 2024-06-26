const { EscortAccountVerificationDocs } = require("../../../models");
const { getUniqueDocumentTypeCombinationIds } = require("../../combinationIds");
const Joi = require("joi");

const documentSchema = Joi.object({
  typeCombinationId: Joi.number().integer().required(),
  url: Joi.string().required(),
});

const storeDocument = async (req, res) => {
  try {
    const { error } = documentSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { typeCombinationId, url } = req.body;
    const userId = req.user.id;

    const documentTypeCombinationIdArray =
      await getUniqueDocumentTypeCombinationIds();

    if (
      typeCombinationId &&
      !documentTypeCombinationIdArray.includes(typeCombinationId)
    ) {
      return res.status(400).json({
        success: false,
        msg: "Document Type that you provided not found",
      });
    }

    await EscortAccountVerificationDocs.destroy({
      where: {
        user_id: userId,
        combination_id: typeCombinationId,
      },
    });

    await EscortAccountVerificationDocs.create({
      user_id: userId,
      url,
      combination_id: typeCombinationId,
    });

    res
      .status(200)
      .json({ success: true, msg: "Document stored successfully" });
  } catch (error) {
    console.error("Error processing the data:", error);
    res.status(500).json({ success: false, msg: "Escort documentation error" });
  }
};

module.exports = { storeDocument };
