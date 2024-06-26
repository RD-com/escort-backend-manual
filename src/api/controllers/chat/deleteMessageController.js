const Joi = require("joi");
const { Chat } = require("../../models");

const deleteSchema = Joi.object({
  id: Joi.number().integer().required(),
});

const deleteMessage = async (req, res) => {
  try {
    const { error } = deleteSchema.validate(req.body);

    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { id } = req.body;

    await Chat.destroy({
      where: {
        id,
      },
      force: true,
    });

    return res
      .status(200)
      .json({ success: true, msg: "Message deleted successfully" });
  } catch (error) {
    console.error("Internal Server Error", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

module.exports = { deleteMessage };
