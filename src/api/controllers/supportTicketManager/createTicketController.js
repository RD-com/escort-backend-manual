const Joi = require("joi");
const { Ticket } = require("../../models");
const { sanitize } = require("../../services");

const ticketSchema = Joi.object({
  userId: Joi.string().required(),
  subject: Joi.string().required().required(),
  content: Joi.string().required().required(),
  repliedTo: Joi.number().integer(),
});

const create = async (req, res) => {
  try {
    const { error } = ticketSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { userId, subject, content, repliedTo } = req.body;

    const sanitizedContent = content
      ? sanitize.sanitizeInput(content)
      : undefined;

    const ticketData = {
      user_id: userId,
      subject,
      content: sanitizedContent,
      replied_to: repliedTo || 0,
      is_closed: 0,
    };

    await Ticket.create(ticketData);

    return res
      .status(201)
      .json({ success: true, msg: "Ticket created successfully" });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

module.exports = { create };
