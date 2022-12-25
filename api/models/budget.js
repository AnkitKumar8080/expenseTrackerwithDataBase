const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
    budget: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Budget", budgetSchema);
