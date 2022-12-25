const express = require("express");
const app = express();
const dotenv = require("dotenv");
const getTransactionRoute = require("./routes/transaction");
const getBudgetRoute = require("./routes/budget");
const connectDB = require("./config/connectDB");
const colors = require("colors");
const morgan = require("morgan");
app.use(express.json());
dotenv.config();
app.use(morgan("dev"));
connectDB();
app.use("/api/v1/transactions", getTransactionRoute);
app.use("/api/v1/budgets", getBudgetRoute);

app.listen(process.env.PORT, () => {
  console.log("server started at port 5000");
});
