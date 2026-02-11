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
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date
  },
  status: {
    type: String,
    enum: ["in-progress", "submitted", "timeout", "violation"],
    default: "in-progress"
  }
});

module.exports = mongoose.model("Attempt", attemptSchema);
