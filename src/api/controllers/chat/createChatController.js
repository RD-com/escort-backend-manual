const Joi = require("joi");
const { Chat } = require("../../models");
const { sanitize } = require("../../services");

const chatSchema = Joi.object({
  sender: Joi.number().integer().required(),
  receiver: Joi.number().integer().required(),
  message: Joi.string().required(),
});

const create = async (req, res) => {
  try {
    const { error } = chatSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { sender, receiver, message } = req.body;

    const sanitizedMessage = await sanitize.sanitizeInput(message);

    const chatData = {
      sender,
      receiver,
      message: sanitizedMessage,
      read_receipt: 0,
      room: 0,
    };

    await Chat.create(chatData);

    return res
      .status(201)
      .json({ success: true, msg: "Chat created successfully" });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

module.exports = { create };
