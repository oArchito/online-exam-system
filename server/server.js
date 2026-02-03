const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// connect database
connectDB();

app.get("/", (req, res) => {
  res.send("Online Exam Backend Running");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});
