const express = require("express");
const multer = require("multer");
const path = require("path");

const { uploadPDF } = require("../controllers/pdfController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// File filter (ONLY PDF)
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files allowed"), false);
  }
};

// Multer setup
const upload = multer({
  storage,
  fileFilter
});

// Route
router.post("/upload", protect, upload.single("pdf"), uploadPDF);

module.exports = router;