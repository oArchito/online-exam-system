const express = require("express");
const connectDB = require("./config/db");

const app = express();

// connect the mongo connection
connectDB();

app.get("/", (req, res) => {
  res.send("Online Exam Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
