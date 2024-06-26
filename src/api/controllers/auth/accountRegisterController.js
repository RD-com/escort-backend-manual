const { request } = require("express");
const {
  Member,
  Escort,
  EscortGallery,
  UserPackage,
  Limitation,
  ApprovalStatus,
  Users,
  Wallet,
} = require("../../models");
const fetch = require("node-fetch");
const { auth } = require("../../services");
require("dotenv").config();

async function accountRegister(accountData) {
  try {
    switch (accountData.accountTypeId) {
      case 1:
        await Member.create({
          user_id: accountData.userId,
          name: accountData.name,
        });
        await Users.update(
          { is_account_verified: "1" },
          { where: { id: accountData.userId } }
        );

        await auth.updateUserRole();

        break;

      case 2:
        await Escort.create({
          user_id: accountData.userId,
          name: accountData.name,
        });
        await EscortGallery.create({
          user_id: accountData.userId,
          name: "main",
          type: "2",
        });
        await UserPackage.create({
          user_id: accountData.userId,
          package_id: 1,
          status: "1",
        });
        await Limitation.create({
          user_id: accountData.userId,
          type: "1",
          is_exceeded: "0",
        });
        await ApprovalStatus.create({
          user_id: accountData.userId,
          is_gallery_verified: "1",
        });

        break;

      default:
        return false;
    }

    return true;
  } catch (error) {
    console.error("Internal Server Error:", error);
    throw new Error("Member Registration Failed");
  }
}

module.exports = { accountRegister };
