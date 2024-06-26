const { Users, Transaction, Wallet } = require("../../../models");
const Joi = require("joi");
const { Op } = require("sequelize");
require("dotenv").config();

const statusSchema = Joi.object({
  status: Joi.string().valid("0", "1", "2"),
  reason: Joi.string().valid("affiliate", "Buy Package"),
});

const getTransactions = async (req, res) => {
  try {
    const { error } = statusSchema.validate(req.query);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { status, reason } = req.query;

    const whereCondition = {};

    if (status) {
      whereCondition.status = status;
    }

    if (reason) {
      whereCondition.reason = reason;
    }

    let totalAmount = await Transaction.sum("amount", {
      where: whereCondition,
    });

    if (totalAmount === null) {
      totalAmount = 0;
    }

    res.status(200).json({
      success: true,
      totalAmount,
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ success: false, msg: "Get username Error" });
  }
};

module.exports = { getTransactions };
