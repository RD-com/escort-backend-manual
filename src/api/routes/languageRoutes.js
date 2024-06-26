const express = require("express");
const router = express.Router();

const { language } = require("../controllers");

router.get("/", language.getLanguage);

module.exports = router;
