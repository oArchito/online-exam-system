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
  status: {
    type: String,
    enum: ["started", "submitted", "violation"],
    default: "started"
  }
});

module.exports = mongoose.model("Attempt", attemptSchema);
