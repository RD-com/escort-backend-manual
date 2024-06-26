const Joi = require("joi");
const { Ticket } = require("../../models");

const closeTicketSchema = Joi.object({
  appointmentId: Joi.number().integer().required(),
  isClosed: Joi.number().valid(1).required(),
});

const close = async (req, res) => {
  try {
    const { error } = closeTicketSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { appointmentId, isClosed } = req.body;

    const ticket = await Ticket.update(
      { is_closed: isClosed },
      { where: { id: appointmentId } }
    );

    const [ticketRawCount] = ticket;

    if (ticketRawCount == 0) {
      return res.status(404).json({
        success: false,
        msg: "Ticket not found",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Ticket status updated successfully",
      ticket,
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

module.exports = { close };
