const {
  EscortGallery,
  MemberGallery,
  Transaction,
  Wallet,
} = require("../../../models");
const Joi = require("joi");

const { Sequelize } = require("sequelize");

const gallerySchema = Joi.object({
  galleryId: Joi.number().integer().required(),
});

const buyPrivateGallery = async (req, res) => {
  try {
    const { error } = gallerySchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { galleryId } = req.body;
    const memberId = req.user.id;

    const galleryResult = await EscortGallery.findOne({
      where: { id: galleryId, type: "1", is_deleted: "0" },
    });
    if (!galleryResult) {
      return res
        .status(404)
        .json({ success: false, msg: "Private Gallery not found." });
    }

    const { price } = galleryResult;
    const existingGallery = await MemberGallery.findOne({
      where: { member_id: memberId, gallery_id: galleryId },
    });

    if (existingGallery) {
      return res
        .status(403)
        .json({ success: false, msg: "You have already bought this gallery." });
    }

    const [rowsUpdated, [updatedWallet]] = await Wallet.update(
      { total_amount: Sequelize.literal(`total_amount - ${price}`) },
      {
        where: {
          user_id: memberId,
          total_amount: { [Sequelize.Op.gte]: price },
        },
        returning: ["id", "total_amount"],
      }
    );

    if (rowsUpdated === 0) {
      return res
        .status(403)
        .json({ success: false, msg: "Insufficient balance in the wallet." });
    }

    await Transaction.create({
      wallet_id: updatedWallet.id,
      amount: price,
      reason: "Buy A Private Gallery",
      session_id: 1,
    });

    await MemberGallery.create({ member_id: memberId, gallery_id: galleryId });

    res.status(200).json({ success: true, msg: "Gallery bought successfully" });
  } catch (error) {
    console.error("Error processing the data:", error);
    const status = error instanceof SyntaxError ? 400 : 500;
    return res
      .status(status)
      .json({ success: false, msg: "Gallery data error" });
  }
};

module.exports = { buyPrivateGallery };
