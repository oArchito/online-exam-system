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
    const { attemptId, answers } = req.body;

    const attempt = await Attempt.findById(attemptId);

    if (!attempt) {
      return res.status(404).json({ message: "Attempt not found" });
    }

    if (attempt.status !== "started") {
      return res.status(400).json({ message: "Exam already submitted" });
    }

    // Get exam
    const exam = await Exam.findById(attempt.exam);

    let score = 0;

    // Calculate score using index
   answers.forEach(ans => {
  const index = Number(ans.questionId);
  const question = exam.questions[index];

  if (question && question.type === "mcq") {
    if (
      question.correctAnswer &&
      ans.answer &&
      question.correctAnswer.toString().trim() ===
      ans.answer.toString().trim()
    ) {
      score++;
    }
  }
});




    // Save data
    attempt.answers = answers;
    attempt.score = score;
    attempt.status = "submitted";
    attempt.submittedAt = new Date();

    await attempt.save();

    res.json({
      message: "Exam submitted successfully",
      score,
      total: exam.questions.length
    });

  } catch (error) {
    console.log(error);
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

// GET RESULT FOR STUDENT
const getResult = async (req, res) => {
  try {
    const { attemptId } = req.params;

    const attempt = await Attempt.findById(attemptId)
      .populate("exam", "title questions");

    if (!attempt) {
      return res.status(404).json({ message: "Attempt not found" });
    }

    res.json({
      examTitle: attempt.exam.title,
      score: attempt.score,
      total: attempt.exam.questions.length,
      status: attempt.status
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getMyResults = async (req, res) => {
  try {
    const attempts = await Attempt.find({
      user: req.user.id,
      status: "submitted"
    }).populate("exam", "title");

    res.json(attempts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createExam,
  startExam,
  submitExam,
  reportViolation,
  joinExamByCode,
  getMyResults,
  getResult,
  getExamById
};




