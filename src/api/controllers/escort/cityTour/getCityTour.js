const { EscortCityTour } = require("../../../models");
const { Sequelize } = require("sequelize");

const getCityTour = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await EscortCityTour.findOne({
      where: {
        user_id: userId,
      },
      attributes: [
        "combination_id",
        [Sequelize.literal(`TO_CHAR("from", 'YYYY-MM-DD')`), "from"],
        [Sequelize.literal(`TO_CHAR("to", 'YYYY-MM-DD')`), "to"],
        "contact_number",
        "contact_email",
      ],
    });

    const formattedData = {
      success: true,
      defaults: data.map((item) => {
        const formattedItem = {
          cityCombinationId: item.combination_id,
          from: item.from,
          to: item.to,
        };

        if (item.contact_number !== null && item.contact_email !== null) {
          formattedItem.contactNumber = item.contact_number;
          formattedItem.contactEmail = item.contact_email;
        }

        return formattedItem;
      }),
    };

    return res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error processing the data:", error);
    if (error instanceof Sequelize.ValidationError) {
      return res.status(400).json({ success: false, msg: "Validation error" });
    }
    return res
      .status(500)
      .json({ success: false, msg: "city tour data error" });
  }
};

module.exports = { getCityTour };
