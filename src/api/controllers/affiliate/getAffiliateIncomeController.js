const { Wallet, Transaction } = require("../../models");
const Joi = require("joi");

const statusSchema = Joi.object({
  status: Joi.string().valid("0", "1"),
});

const income = async (req, res) => {
  try {
    const { error } = statusSchema.validate(req.query);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }
    const userId = req.user.id;
    // const userId = "kp_8e91c150a87240eba6d67ed95f62a1a1";
    const reqStatus = req.query.status;

    const walletData = await Wallet.findOne({
      where: { user_id: userId },
      include: [
        {
          model: Transaction,
          where: { reason: "affiliate", status: reqStatus },
          attributes: ["amount"],
        },
      ],
    });

    // If walletData is null, return totalAmount as 0
    if (!walletData) {
      return res.status(200).json({ success: true, totalAmount: 0 });
    }

    // Calculate the sum of amounts
    const totalAmount = walletData.Transactions.map(
      (transaction) => transaction.amount
    ).reduce((acc, amount) => acc + amount, 0);

    res.status(200).json({ success: true, totalAmount });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ success: false, msg: "Get wallet data Error" });
  }
};

module.exports = { income };
