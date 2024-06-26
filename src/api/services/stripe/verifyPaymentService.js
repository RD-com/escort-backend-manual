require("dotenv").config();
const {
  default: User,
} = require("@kinde-oss/kinde-nodejs-sdk/dist/model/User");
const {
  buyMainPackage,
} = require("../../controllers/escort/package/mainPackageController");
const { Users, Wallet, Transaction, sequelize } = require("../../models");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
require("dotenv").config();

const verifyPayment = async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  if (!session || session.status != "complete") {
    console.error("Error update transaction:");
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }

  const [numUpdatedRows, updatedTransactions] = await Transaction.update(
    { status: "1" },
    {
      where: { session_id: req.query.session_id },
      returning: true,
      plain: true,
    }
  );

  if (numUpdatedRows === 0) {
    console.error("Error updating transaction status");
    res.status(500).json({ success: false, msg: "Internal Server Error" });
    return;
  }

  const userWallet = await Wallet.findOne({
    where: { id: updatedTransactions.dataValues.wallet_id },
    attributes: ["user_id"],
  });
  const userData = await Users.findByPk(userWallet.dataValues.user_id);

  if (userData.dataValues.ref_id != null) {
    const [wallet, created] = await Wallet.findOrCreate({
      where: { user_id: userData.dataValues.ref_id },
    });

    if (wallet) {
      const newTransactionValue =
        (updatedTransactions.dataValues.amount *
          parseInt(process.env.REF_COMISSION)) /
        100;
      const transactionData = {
        wallet_id: wallet.dataValues.id,
        amount: newTransactionValue,
        reason: "Affiliate",
      };

      await Transaction.create(transactionData);

      await Wallet.update(
        {
          total_amount: sequelize.literal(
            `total_amount + ${newTransactionValue}`
          ),
        },
        { where: { id: wallet.dataValues.id }, returning: true, plain: false }
      );
    }
  }

  await buyMainPackage(
    userData.dataValues.id,
    req.query.package_id,
    req.query.time_period
  );

  return res.redirect(process.env.PAYMENT_REDIRECT_URL);
};

module.exports = { verifyPayment };
