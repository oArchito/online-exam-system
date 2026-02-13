const Exam = require("../models/Exam");
const Attempt = require("../models/Attempt");


const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const createExam = async (req, res) => {
  try {
    const { title, duration, questions, rules } = req.body;

    if (!title || !duration || !questions) {
      return res.status(400).json({
        message: "Title, duration and questions are required"
      });
    }

    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    const exam = await Exam.create({
      title,
      duration,
      questions,
      rules,
      code,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Exam created successfully",
      code: exam.code,
      examId: exam._id
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
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
const submitExam = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    const { attemptId, answers } = req.body;

    const attempt = await Attempt.findById(attemptId);

    if (!attempt) {
      return res.status(404).json({
        message: "Attempt not found"
      });
    }

    attempt.answers = answers;
    attempt.status = "submitted";

    await attempt.save();

    res.json({
      message: "Exam submitted successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
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

const joinExamByCode = async (req, res) => {
  try {
    const { code } = req.body;

    const exam = await Exam.findOne({ code });

    if (!exam) {
      return res.status(404).json({
        message: "Invalid exam code"
      });
    }

    // NEW: check existing attempt
    const existingAttempt = await Attempt.findOne({
      user: req.user.id,
      exam: exam._id
    });

    if (existingAttempt) {
      return res.status(400).json({
        message: "You have already attempted this exam"
      });
    }

    // create new attempt
    const attempt = await Attempt.create({
      user: req.user.id,
      exam: exam._id,
      status: "started"
    });

    res.json({
      message: "Joined successfully",
      attempt,
      examId: exam._id,
      duration: exam.duration
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};


// GET EXAM DETAILS (for student)
const getExamById = async (req, res) => {
  try {
    const { id } = req.params;

    const exam = await Exam.findById(id);

    if (!exam) {
      return res.status(404).json({
        message: "Exam not found"
      });
    }

    res.json(exam);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};



module.exports = {
  createExam,
  startExam,
  submitExam,
  reportViolation,
  joinExamByCode,
  getExamById
};




