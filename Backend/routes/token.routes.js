const express = require("express");
const { getTokens, addTokens, delTokens } = require("../controllers/token.controller.js");

const router = express.Router();

router.route("/get").get(getTokens);
router.route("/add").post(addTokens);
router.route("/del").post(delTokens);

module.exports = router;
