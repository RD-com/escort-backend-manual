const { use } = require("passport");
const { Users } = require("../../models");

const MAX_LOGIN_ATTEMPTS = process.env.MAX_LOGIN_ATTEMPTS_COUNT;
const LOCK_DURATION_MINUTES = process.env.LOCK_DURATION_IN_MINUTES;

const checkAccountLock = async (userId) => {
  try {
    const user = await Users.findByPk(userId);
    if (
      !user ||
      !user.login_attempts ||
      user.login_attempts < MAX_LOGIN_ATTEMPTS
    ) {
      return false;
    }

    const lockReleaseTime =
      user.updatedAt.getTime() + LOCK_DURATION_MINUTES * 60 * 1000;
    const currentTime = new Date().getTime();

    if (currentTime < lockReleaseTime) {
      return true;
    } else {
      await Users.update({ login_attempts: 0 }, { where: { id: userId } });
      return false;
    }
  } catch (error) {
    console.error("Error in checkAccountLock:", error);
    return { success: false, msg: "Error checking account lock" };
  }
};

module.exports = { checkAccountLock };
