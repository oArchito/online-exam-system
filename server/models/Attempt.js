const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true
  },
  answers: [
    {
      questionId: String,
      answer: String
    }
  ],
  score: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ["started", "submitted", "auto-submitted"],
    default: "started"
  },
  startedAt: Date,
  submittedAt: Date
});

// IMPORTANT FIX
module.exports =
  mongoose.models.Attempt ||
  mongoose.model("Attempt", attemptSchema);
