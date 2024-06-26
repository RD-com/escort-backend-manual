const { Users } = require("../../models");

const get = async (req, res) => {
  try {
    const userId = req.user.id;

    const usernameData = await Users.findOne({
      where: { id: userId },
      attributes: ["username"],
    });

    if (usernameData.length === 0) {
      return res.status(404).json({ success: false, msg: "User not found!" });
    }

    const username = usernameData.dataValues.username;

    console.log(username);
    res.status(200).json({ success: true, username });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ success: false, msg: "Get username Error" });
  }
};

module.exports = { get };
