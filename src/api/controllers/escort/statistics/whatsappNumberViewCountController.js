const { EscortStatics, Escort } = require("../../../models");

const Joi = require("joi");

const viewCountSchema = Joi.object({
  escortUserId: Joi.string().required(),
});

const countWhatsappNumberView = async (req, res) => {
  try {
    const { error } = viewCountSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }
    const { escortUserId } = req.body;
    const userId = req.user.id;
    try {
      if (escortUserId == userId) {
        return res.status(403).json({
          success: false,
          msg: "You are not authorized to perform this action",
        });
      }
      const escort = await Escort.findOne({ where: { id: escortUserId } });
      if (!escort) {
        return res.status(404).json({
          success: false,
          msg: "Escort not found",
        });
      }
      const result = await EscortStatics.increment(
        "whatsapp_number_view_count",
        {
          by: 1,
          where: { user_id: escortUserId },
        }
      );
      if (result[0][1] == 0) {
        await EscortStatics.create({
          user_id: escortUserId,
          whatsapp_number_view_count: 1,
        });
      }

      res.status(200).json({
        success: true,
        msg: "Whatsapp number view count incremented successfully",
      });
    } catch (error) {
      console.error("Error processing the data:", error);
      res
        .status(400)
        .json({ success: false, msg: "Whatsapp number view count error" });
    }
  } catch (error) {
    console.error("Error processing the data:", error);
    res
      .status(500)
      .json({ success: false, msg: "Whatsapp number view count error" });
  }
};

module.exports = { countWhatsappNumberView };
