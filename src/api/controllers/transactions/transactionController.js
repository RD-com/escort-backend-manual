const { Users, Transaction, Wallet } = require("../../models");
const Joi = require("joi");
const { Op, where } = require("sequelize");
const { transaction } = require("..");
require("dotenv").config();

const statusSchema = Joi.object({
    status: Joi.string().valid("0","1", "2"),
    reason: Joi.string().valid("affiliate","Buy Package"),
});

const get = async (req, res) => {
  try {
    const { error } = statusSchema.validate(req.query);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const {status,reason} = req.query;
    const userId = req.user.id;
    // const userId = "kp_d072ffc3a4a44d328cbaed05e6c0fe0e";

    const walletData = await Wallet.findOne({
        where: { user_id: userId },
        attributes: ["id"],
      });

      if (!walletData) {
        return res.status(404).json({ success: false, msg: "Wallet not found!" });
      }

      const whereCondition = {
        wallet_id: walletData.dataValues.id,
      };
  
      if (status) {
        whereCondition.status = status;
      }

      if (reason) {
        whereCondition.reason = reason;
      }
  

    const transactionData = await Transaction.findAll({
      where: whereCondition,
      attributes: ["created_at","amount","reason","status"],
    });

    res
      .status(200)
      .json({ success: true, transactions: transactionData });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ success: false, msg: "Get username Error" });
  }
};

module.exports = { get };
