const express = require("express");
const router = express.Router();

const { mainSearch } = require("../controllers");

router.get("/", mainSearch.search);

module.exports = router;
