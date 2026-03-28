import { useState } from "react";
import API from "../services/api";

function CreateExam() {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [message, setMessage] = useState("");

  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      answer: "",
      type: "mcq"
    }
  ]);

  const token = localStorage.getItem("token");

  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].question = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const handleAnswerChange = (index, value) => {
    const updated = [...questions];
    updated[index].answer = value.trim();
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", "", "", ""],
        answer: "",
        type: "mcq"
      }
    ]);
  };

  const validate = () => {
    if (!title || !duration) return "Title & duration required";

    for (let q of questions) {
      if (!q.question.trim()) return "Question missing";
      if (q.options.some(opt => !opt.trim())) return "Fill all options";
      if (!q.answer) return "Select correct answer";
    }

    return null;
  };

  const handleSubmit = async () => {
    const error = validate();
    if (error) {
      setMessage(error);
      return;
    }

    try {
      const formattedQuestions = questions.map(q => ({
        question: q.question.trim(),
        options: q.options.map(opt => opt.trim()),
        correctAnswer: q.answer.trim(),
        type: "mcq"
      }));

      const res = await API.post(
        "/exams",
        {
          title,
          duration: Number(duration),
          questions: formattedQuestions,
          rules: {}
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage(`✅ Exam Created! Code: ${res.data.code}`);
    } catch (err) {
      setMessage("Error creating exam");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Create Exam</h2>

        <input
          style={styles.input}
          placeholder="Exam Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          style={styles.input}
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <h3 style={styles.subHeading}>Questions</h3>

        {questions.map((q, index) => (
          <div key={index} style={styles.card}>
            <input
              style={styles.input}
              placeholder={`Question ${index + 1}`}
              value={q.question}
              onChange={(e) =>
                handleQuestionChange(index, e.target.value)
              }
            />

            {q.options.map((opt, i) => (
              <input
                key={i}
                style={styles.input}
                placeholder={`Option ${i + 1}`}
                value={opt}
                onChange={(e) =>
                  handleOptionChange(index, i, e.target.value)
                }
              />
            ))}

            <select
              style={styles.input}
              value={q.answer}
              onChange={(e) =>
                handleAnswerChange(index, e.target.value)
              }
            >
              <option value="">Select Correct Answer</option>
              {q.options.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}

        <button style={styles.secondaryBtn} onClick={addQuestion}>
          + Add Question
        </button>

        <button style={styles.primaryBtn} onClick={handleSubmit}>
          Create Exam
        </button>

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#141514",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    width: "500px",
    background: "#4e514e",
    padding: "30px",
    borderRadius: "12px",
    color: "#d8cec5"
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#86abc5"
  },
  subHeading: {
    marginTop: "20px"
  },
  card: {
    background: "#2a2b2a",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "8px"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "none"
  },
  primaryBtn: {
    width: "100%",
    padding: "12px",
    background: "#86abc5",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "6px",
    marginTop: "10px"
  },
  secondaryBtn: {
    width: "100%",
    padding: "10px",
    background: "#888",
    border: "none",
    cursor: "pointer",
    borderRadius: "6px",
    marginTop: "10px"
  },
  message: {
    marginTop: "15px",
    textAlign: "center"
  }
};

export default CreateExam;