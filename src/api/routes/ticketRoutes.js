const express = require("express");
const router = express.Router();

const { ticket } = require("../controllers");

router.post("/", ticket.create);
router.get("/", ticket.get);
router.delete("/", ticket.close);

module.exports = router;
