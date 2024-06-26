const { EscortContactDetails } = require("../../../models");

const getContactDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    try {
      const data = await EscortContactDetails.findOne({
        where: { user_id: userId },
        attributes: [
          ["contact_number", "contactNumber"],
          ["combination_id", "contactInstructioncombinationId"],
          ["address_club_name", "addressClubName"],
          ["address_street", "addressStreet"],
          ["address_nr", "addressNr"],
        ],
      });

      return res.status(200).json({ success: true, defaults: data });
    } catch (error) {
      console.error("Error processing the data:", error);
      res
        .status(400)
        .json({ success: false, msg: "Get escort contact details error" });
    }
  } catch (error) {
    console.error("Error processing the data:", error);
    res.status(500).json({ success: false, msg: "Get contact details error" });
  }
};

module.exports = { getContactDetails };
