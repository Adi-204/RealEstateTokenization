const express = require("express");
const { getTokens, addTokens, delTokens, getAllTokens, setLocation } = require("../controllers/token.controller.js");

const router = express.Router();

router.route("/get").get(getTokens);
router.route("/getall").get(getAllTokens);
router.route("/setlocation").post(setLocation);
router.route("/add").post(addTokens);
router.route("/del").post(delTokens);

module.exports = router;
