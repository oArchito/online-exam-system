const express = require("express");
const router = express.Router();

const {
  createExam,
  startExam,
  submitExam,
  reportViolation,
  joinExamByCode,
  getResult,
  getExamById
} = require("../controllers/examController");

const controller = require("../controllers/examController");
console.log(controller);


const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

// Admin creates exam
router.post("/", protect, isAdmin, createExam);

// Student starts exam
router.post("/start", protect, startExam);

// Student submits exam
router.post("/submit", protect, submitExam);

// Tab switch / rule violation
router.post("/violation", protect, reportViolation);

router.post("/join", protect, joinExamByCode);

router.get("/:id", protect, getExamById);

router.get("/result/:attemptId", protect, getResult);

console.log("Exam Routes Loaded");


module.exports = router;
