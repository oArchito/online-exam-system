const express = require("express");
const router = express.Router();

const { createExam, startExam, submitExam } = require("../controllers/examController");

const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

// Admin creates exam
router.post("/", protect, isAdmin, createExam);

// Student starts exam
router.post("/start", protect, startExam);

// Student submits exam
router.post("/submit", protect, submitExam);


module.exports = router;
