const express = require("express");
const router = express.Router();

const { form } = require("../controllers");
router.get("/", form.getFormData);

module.exports = router;
