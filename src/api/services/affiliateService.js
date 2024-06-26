const { Users, Transaction, Wallet } = require("../models");
require("dotenv").config();

const affiliateProcess = async (reqUsername, userId) => {
  try {
    const usernameData = await Users.findOne({
      where: { username: reqUsername },
      attributes: ["id"],
    });

    if (usernameData.length === 0) {
      return false;
    }

    const refUserId = usernameData.dataValues.id;

    await Users.update({ ref_id: refUserId }, { where: { id: userId } });

    const [walletIdData, created] = await Wallet.findOrCreate({
      where: { user_id: refUserId },
      attributes: ["id"],
    });

    return true;
  } catch (error) {
    return false;
  }
};

module.exports = { affiliateProcess };
