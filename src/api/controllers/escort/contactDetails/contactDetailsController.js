const { EscortContactDetails } = require("../../../models");
const {
  getUniqueContactInstructionCombinationIds,
} = require("../../combinationIds");
const Joi = require("joi");
const { sanitize } = require("../../../services");

const contactDetailsSchema = Joi.object({
  contactNumber: Joi.string().required(),
  contactInstructioncombinationId: Joi.number().integer(),
  addressClubName: Joi.string(),
  addressStreet: Joi.string(),
  addressNr: Joi.string(),
});

const createContactDetails = async (req, res) => {
  try {
    const { error } = contactDetailsSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const {
      contactNumber,
      contactInstructioncombinationId,
      addressClubName,
      addressStreet,
      addressNr,
    } = req.body;

    const userId = req.user.id;

    try {
      const contactInstructionCombinationIdArray =
        await getUniqueContactInstructionCombinationIds();

      if (
        contactInstructioncombinationId &&
        !contactInstructionCombinationIdArray.includes(
          contactInstructioncombinationId
        )
      ) {
        return res.status(400).json({
          success: false,
          msg: "Contact Details data that you provided not found",
        });
      }

      const sanitizedAddressClubName = addressClubName
        ? sanitize.sanitizeInput(addressClubName)
        : undefined;
      const sanitizedAddressStreet = addressStreet
        ? sanitize.sanitizeInput(addressStreet)
        : undefined;
      const sanitizedAddressNr = addressNr
        ? sanitize.sanitizeInput(addressNr)
        : undefined;

      const contactDetailsData = {
        user_id: userId,
        contact_number: contactNumber,
        combination_id: contactInstructioncombinationId,
        address_club_name: sanitizedAddressClubName,
        address_street: sanitizedAddressStreet,
        address_nr: sanitizedAddressNr,
      };
      await EscortContactDetails.upsert(contactDetailsData);
      return res
        .status(200)
        .json({ success: true, msg: "Contact Details Created Successfully" });
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

module.exports = { createContactDetails };
