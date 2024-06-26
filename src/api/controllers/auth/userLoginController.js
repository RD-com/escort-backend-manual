const bcrypt = require("bcrypt");
const Joi = require("joi");
const { Users } = require("../../models");
const { auth } = require("../../services");

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { email, password } = req.body;

    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "User Doesn't Exist" });
    }

    let isPasswordValid = false;

    if (user.password_hash) {
      isPasswordValid = await bcrypt.compare(password, user.password_hash);
    } else {
      isPasswordValid = false;
    }

    if (!isPasswordValid) {
      await incrementLoginAttempts(email);
      return res
        .status(400)
        .json({ success: false, msg: "Wrong email and Password Combination!" });
    }

    const accessToken = auth.createTokens(user);
    const accountType = user.account_type_id;
    await resetLoginAttempts(email);

    res.cookie("access-token", accessToken, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      accessToken,
      accountType,
      msg: "LOGGED IN",
      redirect: user.current_step,
      accountType: user.account_type_id,
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ success: false, msg: "Failed to login" });
  }
};

const incrementLoginAttempts = async (email) => {
  await Users.increment("login_attempts", { by: 1, where: { email } });
};

const resetLoginAttempts = async (email) => {
  await Users.update({ login_attempts: 0 }, { where: { email } });
};

module.exports = { login };
