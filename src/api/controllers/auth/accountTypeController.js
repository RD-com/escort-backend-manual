const { UserAccountType } = require("../../models");

async function getAccoutTypes() {
  try {
    const accountTypes = await UserAccountType.findAll({
      attributes: ["id"],
    });

    const accountTypeArray = accountTypes.map((record) => record.id);

    return accountTypeArray;
  } catch (error) {
    console.error("Internal Server Error:", error);
    throw new Error("Failed to get account types");
  }
}

module.exports = { getAccoutTypes };
