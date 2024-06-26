const Joi = require("joi");
const { Chat, Sequelize } = require("../../models");

const deleteSchema = Joi.object({
  room: Joi.string().required(),
  userId: Joi.string().required(),
});

const deleteChat = async (req, res) => {
  try {
    const { error } = deleteSchema.validate(req.body);

    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { room, userId } = req.body;

    const [updatedRowsCount, updatedRows] = await Chat.update(
      {
        deleted_member_one: userId,
      },
      {
        where: {
          room,
          deleted_member_one: null,
          deleted_member_two: null,
        },
      }
    );

    if (updatedRowsCount > 0) {
      return res
        .status(200)
        .json({ success: true, msg: "Chat deleted successfully" });
    }

    const [updatedRowsCount2, updatedRows2] = await Chat.update(
      {
        deleted_member_two: userId,
      },
      {
        where: {
          room,
          deleted_member_one: {
            [Sequelize.Op.not]: null,
          },
          deleted_member_two: null,
        },
      }
    );

    if (updatedRowsCount2 > 0) {
      return res.status(200).json({
        success: true,
        msg: "Chat deleted successfully",
      });
    }

    return res
      .status(404)
      .json({ success: false, msg: "Chat not found or already deleted" });
  } catch (error) {
    console.error("Internal Server Error", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

module.exports = { deleteChat };
