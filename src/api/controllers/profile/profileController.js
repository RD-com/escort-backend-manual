const view = (req, res) => {
  const userId = req.myUserId;
  if (userId === 1) {
    console.log("User ", userId);
  }

  res.json("profile");
};

module.exports = { view };
