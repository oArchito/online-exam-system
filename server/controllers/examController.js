const Attempt = require("../models/Attempt");
const Exam = require("../models/Exam");

// CREATE EXAM
const createExam = async (req, res) => {
  try {
    const { title, duration, rules } = req.body;

    if (!title || !duration || !rules) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const exam = await Exam.create({
      title,
      duration,
      rules,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Exam created successfully",
      exam
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};
// START EXAM (Student)
const startExam = async (req, res) => {
  try {
    const { examId } = req.body;

    // check exam exists
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    // create attempt
    const attempt = await Attempt.create({
      user: req.user.id,
      exam: examId
    });

    res.status(201).json({
      message: "Exam started",
      attempt,
      duration: exam.duration
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// SUBMIT EXAM
// SUBMIT EXAM
const submitExam = async (req, res) => {
  try {
    const { attemptId } = req.body;

    const attempt = await Attempt.findById(attemptId).populate("exam");

    if (!attempt) {
      return res.status(404).json({ message: "Attempt not found" });
    }

    // Only same user can submit
    if (attempt.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Check if already submitted
    if (attempt.status !== "in-progress") {
      return res.status(400).json({ message: "Exam already finished" });
    }

    // Calculate time passed
    const now = new Date();
    const startTime = new Date(attempt.startTime);
    const durationMinutes = attempt.exam.duration;

    const timePassed = (now - startTime) / (1000 * 60);

    // If time exceeded
    if (timePassed > durationMinutes) {
      attempt.status = "timeout";
      attempt.endTime = now;
      await attempt.save();

      return res.status(400).json({
        message: "Time over. Exam auto-submitted.",
        attempt
      });
    }

    // Normal submission
    attempt.status = "submitted";
    attempt.endTime = now;
    await attempt.save();

    res.json({
      message: "Exam submitted successfully",
      attempt
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// HANDLE TAB SWITCH / RULE VIOLATION
const reportViolation = async (req, res) => {
  try {
    const { attemptId } = req.body;

    const attempt = await Attempt.findById(attemptId);

    if (!attempt) {
      return res.status(404).json({ message: "Attempt not found" });
    }

    // Only same user can report
    if (attempt.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // If already finished, do nothing
    if (attempt.status !== "in-progress") {
      return res.status(400).json({ message: "Exam already finished" });
    }

    attempt.status = "violation";
    attempt.endTime = new Date();

    await attempt.save();

    res.json({
      message: "Exam ended due to rule violation",
      attempt
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = {
  createExam,
  startExam,
  submitExam,
  reportViolation
};


