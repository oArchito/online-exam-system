const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

// Routes
const authRoutes = require("./routes/authRoutes");
const examRoutes = require("./routes/examRoutes");
const pdfRoutes = require("./routes/pdfRoutes");

// Load env
dotenv.config();

// Init app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static folder (VERY IMPORTANT for file access)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect DB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("Online Exam Backend Running");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/pdf", pdfRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});