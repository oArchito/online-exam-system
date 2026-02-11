const express = require("express");
const { createExam } = require("../controllers/examController");

const router = express.Router();

// create exam
router.post("/", createExam);

module.exports = router;
