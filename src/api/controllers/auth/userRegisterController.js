const Joi = require("joi");
const {
  sanitize,
  affiliate,
  createContact,
  addContactToList,
} = require("../../services");
const { Users, Wallet } = require("../../models");
const { Op } = require("sequelize");
const { getAccoutTypes } = require("./accountTypeController");
const { accountRegister } = require("./accountRegisterController");
const fetch = require("node-fetch");
require("dotenv").config();

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  accountTypeId: Joi.number().integer().valid(1, 2).required(),
  username: Joi.string().required(),
  name: Joi.string().required(),
  affiliate_username: Joi.string(),
});

const register = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { email, accountTypeId, username, name, affiliate_username } =
      req.body;
    const userId = req.user.id;

    const userExists = await Users.findOne({ where: { id: userId } });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, msg: "User Already Exists" });
    }

    const accountTypeArray = await getAccoutTypes();
    if (!accountTypeArray.includes(accountTypeId)) {
      console.error("Account Type Error");
      return res
        .status(400)
        .json({ success: false, msg: "Cant find account type" });
    }

    const whereClause = {};
    if (email) whereClause.email = email;
    if (username) whereClause.username = username;

    const [user, created] = await Users.findOrCreate({
      where: {
        [Op.or]: [{ email }, { username }],
      },
      defaults: {
        id: userId,
        email,
        username,
        account_type_id: accountTypeId,
      },
    });

    if (!created) {
      let errorMsg;
      if (user.email === email) {
        errorMsg = "Email already exists.";
      } else {
        errorMsg = "Username already exists.";
      }
      return res.status(400).json({
        success: false,
        msg: errorMsg,
      });
    }
    const sanitizedName = name ? sanitize.sanitizeInput(name) : undefined;

    accountData = {
      userId,
      accountTypeId,
      name: sanitizedName,
      email,
    };
    const registerdAccount = await accountRegister(accountData);

    if (!registerdAccount) {
      console.error("Internal Server Error:", error);
      return res
        .status(500)
        .json({ success: false, msg: "User Registration Error" });
    }

    await createContact(sanitizedName, email);

    if (accountTypeId == 1) {
      await Users.update(
        { current_step: "/member/register/basic-bio" },
        { where: { email } }
      );

      await addContactToList(email, process.env.BREVO_MEMBER_LIST_ID);
    } else if (accountTypeId == 2) {
      await Users.update(
        { current_step: "/escort/register/basic-bio" },
        { where: { email } }
      );

      await addContactToList(email, process.env.BREVO_ESCORT_LIST_ID);
    }

    if (affiliate_username) {
      await affiliate.affiliateProcess(affiliate_username, userId);
    }

    await Wallet.create({ user_id: userId });

    res.status(200).json({ success: true, msg: "USER REGISTERED" });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ success: false, msg: "User Registration Error" });
  }
};

module.exports = { register };
