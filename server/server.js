const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

app.use(express.json());

// connect database
connectDB();

app.get("/", (req, res) => {
  res.send("Online Exam Backend Running");
});

// auth routes
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});
