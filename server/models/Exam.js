const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["mcq", "theory"],
    required: true
  },
  options: {
    type: [String]
  }
});

const examSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },

  code: String,

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  // NEW
  rules: {
    noTabSwitch: {
      type: Boolean,
      default: true
    },
    noCopyPaste: {
      type: Boolean,
      default: true
    },
    autoSubmitOnViolation: {
      type: Boolean,
      default: true
    }
  },

  questions: [questionSchema]
});

module.exports = mongoose.model("Exam", examSchema);
