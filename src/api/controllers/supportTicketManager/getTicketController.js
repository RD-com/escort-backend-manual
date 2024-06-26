const Joi = require("joi");
const { Ticket } = require("../../models");

const get = async (req, res) => {
  try {
    userId = req.user.id;

    const tickets = await Ticket.findAll({
      where: {
        user_id: userId,
      },
    });

    return res.status(200).json({ success: true, tickets });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

module.exports = { get };
