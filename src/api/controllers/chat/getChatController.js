const Joi = require("joi");
const { Chat } = require("../../models");
const { Op } = require("sequelize");

const getChatSchema = Joi.object({
  sender: Joi.number().integer().required(),
  receiver: Joi.number().integer().required(),
});

const get = async (req, res) => {
  try {
    const { error } = getChatSchema.validate(req.query);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { sender, receiver } = req.query;
    const chatData = {
      [Op.or]: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    };

    const chats = await Chat.findAll({
      where: chatData,
    });

    return res.status(200).json({ success: true, chats });
  } catch (error) {
    console.error("Internal Server Error", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

module.exports = { get };
