const express = require("express");
const { getTransaction, setTransaction } = require("../controllers/transaction.controller.js");

const router = express.Router();

router.route("/get").get(getTransaction);
router.route("/set").post(setTransaction);

module.exports = router;
