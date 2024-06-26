const { Users, Transaction, Wallet } = require("../../models");
const Joi = require("joi");
const { Op, where } = require("sequelize");
const { transaction } = require("..");
require("dotenv").config();

const walletBalance = async (req, res) => {
  try {
    const userId = req.user.id;
    // const userId = "kp_d072ffc3a4a44d328cbaed05e6c0fe0e";

    const walletData = await Wallet.findOne({
      where: { user_id: userId },
      attributes: ["total_amount"],
    });

    if (!walletData) {
      return res.status(404).json({ success: false, msg: "Wallet not found!" });
    }

    res.status(200).json({ success: true, balance: walletData });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ success: false, msg: "Get username Error" });
  }
};

module.exports = { walletBalance };
