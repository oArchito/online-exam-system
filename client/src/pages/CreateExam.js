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
      setMessage("❌ Error creating exam");
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
            
            <p style={styles.questionLabel}>
              Question {index + 1}
            </p>

            <input
              style={styles.input}
              placeholder="Enter question"
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
              style={{ ...styles.input, cursor: "pointer" }}
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
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    minHeight: "100vh",
    padding: "40px",
    fontFamily: "Segoe UI, sans-serif",
    color: "#fff"
  },

  container: {
    maxWidth: "700px",
    margin: "auto",
    background: "rgba(255,255,255,0.08)",
    padding: "35px",
    borderRadius: "16px",
    backdropFilter: "blur(12px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
  },

  heading: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "26px",
    fontWeight: "600"
  },

  subHeading: {
    marginTop: "25px",
    marginBottom: "10px",
    fontSize: "18px",
    fontWeight: "500"
  },

  card: {
    background: "rgba(255,255,255,0.06)",
    padding: "18px",
    marginBottom: "15px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
  },

  questionLabel: {
    marginBottom: "6px",
    fontWeight: "500"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    fontSize: "14px"
  },

  primaryBtn: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #00c6ff, #0072ff)",
    border: "none",
    borderRadius: "25px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "#fff",
    marginTop: "15px",
    boxShadow: "0 5px 15px rgba(0,114,255,0.4)"
  },

  secondaryBtn: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#fff",
    marginTop: "10px",
    boxShadow: "0 5px 15px rgba(255,126,95,0.4)"
  },

  message: {
    marginTop: "20px",
    textAlign: "center",
    fontWeight: "bold"
  }
};

export default CreateExam;