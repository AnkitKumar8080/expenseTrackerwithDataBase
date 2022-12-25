const express = require("express");
const router = express.Router();
const { getBudget, deleteBudget } = require("../controller/budgets");
const { addBuget } = require("../controller/budgets");

router.route("/").get(getBudget).post(addBuget).delete(deleteBudget);
module.exports = router;
