const { Users, ApprovalStatus } = require("../../../../models");

async function verifyEscortAccount(escortId) {
  try {
    const verified = await ApprovalStatus.findOne({
      where: {
        user_id: escortId,
        is_newcomer_verified: "1",
        is_settings_verified: "1",
        is_gallery_verified: "1",
      },
    });

    const isAccountVerified = verified ? "1" : "0";
    await Users.update(
      { is_account_verified: isAccountVerified },
      { where: { id: escortId } }
    );
  } catch (error) {
    console.error("Internal Server Error:", error);
    throw new Error("Processing the verification Failed");
  }
}

module.exports = { verifyEscortAccount };
