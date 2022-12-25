const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "please Add some text"],
    },
    cost: {
      type: Number,
      required: [true, "please add a cost"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trasaction", TransactionSchema);
