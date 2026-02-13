const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  questionId: String,
  answer: String
});

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

  status: {
    type: String,
    enum: ["started", "submitted", "terminated"],
    default: "started"
  },

  startTime: {
    type: Date,
    default: Date.now
  },

  answers: [answerSchema]   // NEW
});

module.exports = mongoose.model("Attempt", attemptSchema);
