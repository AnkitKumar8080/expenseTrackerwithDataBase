const Budget = require("../models/budget");

// @desc Get all Budgets
// @route Get /api/v1/budgets
// @access public

exports.getBudget = async (req, res) => {
  try {
    const budgets = await Budget.find();
    return res.status(200).json({
      success: true,
      count: budgets.length,
      data: budgets,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "server error",
    });
  }
};

// @desc Add Budget
// @route POST /api/v1/budgets
// @access public

exports.addBuget = async (req, res) => {
  try {
    const budget = await Budget.create(req.body);
    return res.status(200).json({
      success: true,
      data: budget,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "server Error",
    });
  }
};

// @desc delete Budget
// @route DELETE /api/v1/budgets
// @access public

exports.deleteBudget = async (req, res) => {
  try {
    await Budget.findOneAndRemove(req.body);
    return res.status(201).json({
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
