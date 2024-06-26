const express = require("express");
const router = express.Router();

const { chat } = require("../controllers");

router.post("/", chat.create);
router.get("/", chat.get);
router.delete("/message", chat.deleteMessage);
router.delete("/full-chat", chat.deleteChat);

module.exports = router;
