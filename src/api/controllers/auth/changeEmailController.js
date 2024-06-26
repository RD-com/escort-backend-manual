const bcrypt = require("bcrypt");
const Joi = require("joi");
const { Users } = require("../../models");
const { auth } = require("../../services");

const changeEmailSchema = Joi.object({
  currentEmail: Joi.string().email().required(),
  newEmail: Joi.string().email().required(),
  currentPassword: Joi.string().min(8).required(),
});

const changeEmail = async (req, res) => {
  try {
    const { error } = changeEmailSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { currentEmail, newEmail, currentPassword } = req.body;

    const user = await Users.findOne({ where: { email: currentEmail } });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "Current Email that you provided is not found",
      });
    }

    let isPasswordValid = false;

    if (user.password_hash) {
      isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password_hash
      );
    } else {
      isPasswordValid = false;
    }

    if (!isPasswordValid) {
      await incrementLoginAttempts(currentEmail);
      return res
        .status(400)
        .json({ success: false, msg: "Wrong email and Password Combination!" });
    }

    await resetLoginAttempts(currentEmail);

    const result = await Users.update(
      { email: newEmail },
      { where: { email: currentEmail } }
    );

    if (result[0] <= 0) {
      res.status(400).json({ error: "Email not found or no changes made" });
    }
    res.status(200).json({
      success: true,
      msg: "Email successfully changed",
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ success: false, msg: "Failed to change email" });
  }
};

const incrementLoginAttempts = async (currentEmail) => {
  await Users.increment("login_attempts", {
    by: 1,
    where: { email: currentEmail },
  });
};

const resetLoginAttempts = async (currentEmail) => {
  await Users.update({ login_attempts: 0 }, { where: { email: currentEmail } });
};

module.exports = { changeEmail };
