const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");



// Load env variables
dotenv.config();




// Import routes
const authRoutes = require("./routes/authRoutes");
const examRoutes = require("./routes/examRoutes");

// Debug: check if routes are loading
console.log("authRoutes import:", authRoutes);
console.log("examRoutes import:", examRoutes);

const app = express();
app.use(cors());        // ADD THIS
app.use(express.json());
// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Root route (test)
app.get("/", (req, res) => {
  res.send("Online Exam Backend Running");
});

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/exams", examRoutes);

console.log("Routes mounted");

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
