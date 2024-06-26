require("dotenv").config();
const { User } = require("@kinde-oss/kinde-nodejs-sdk");
const {
  Wallet,
  Transaction,
  CoinPack,
  CoinPackOffer,
  Pricing,
  Users,
} = require("../../models");
const { createPayment } = require("./createPaymentService");
const Joi = require("joi");
require("dotenv").config();

const paymentSchema = Joi.object({
  packageId: Joi.number().integer().required(),
  timePeriod: Joi.number().integer().required(),
  promotion: Joi.number().integer(),
});

const buyCoins = async (req, res) => {
  try {
    const { error } = paymentSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { packageId, timePeriod, promotion } = req.body;
    // const userId = "kp_180d87e6e0214e4e8877b72056fecb85";
    const userId = req.user.id;

    const packagePrice = await Pricing.findOne({
      where: { package_id: packageId, time_period: String(timePeriod) },
      attributes: ["price"],
    });

    if (!packagePrice || packagePrice.length === 0) {
      return res.status(404).json({
        success: false,
        msg: `No Package Found`,
      });
    }

    // console.log(packagePrice.dataValues.price);
    let price = packagePrice.dataValues.price;
    const refIdVal = await Users.findByPk(userId);
    const refId = refIdVal.dataValues.ref_id;

    if (refId != null) {
      price = price - (price * parseInt(process.env.REF_DISCOUNT)) / 100;
    } else if (promotion) {
      price = price - (price * parseInt(process.env.PROMO_DISCOUNT)) / 100;
    }

    const session = await createPayment(price, packageId, timePeriod);

    if (!session) {
      console.error("Error creating payment:");
      res.status(500).json({ success: false, msg: "Internal Server Error" });
    }

    const [wallet, created] = await Wallet.findOrCreate({
      where: { user_id: userId },
    });

    if (!wallet) {
      console.error("Error creating wallet:");
      res.status(500).json({ success: false, msg: "Internal Server Error" });
    }

    const transactionData = {
      wallet_id: wallet.dataValues.id,
      amount: price,
      reason: "Buy Package",
      session_id: session.id,
    };

    await Transaction.create(transactionData);

    res.status(200).json({ success: true, redirect: session.url });
  } catch (error) {
    console.error("Error creating payment:", error.message);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

module.exports = { buyCoins };
