import { useEffect, useState } from "react";
import API from "../services/api";

function CreateExam() {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [message, setMessage] = useState("");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDark(true);
  }, []);

  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      answer: "",
      type: "mcq"
    }
  ]);

  const token = localStorage.getItem("token");

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
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

  // ✅ DELETE QUESTION (Q1 SAFE)
  const deleteQuestion = (index) => {
    if (index === 0) return;
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  const validate = () => {
    if (!title || !duration) return "Title & duration required";

    for (let q of questions) {
      if (!q.question.trim()) return "Question missing";

      if (q.type === "mcq") {
        if (q.options.some(opt => !opt.trim()))
          return "Fill all options";
        if (!q.answer) return "Select correct answer";
      }
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
      const formattedQuestions = questions.map(q => {
        if (q.type === "theory") {
          return {
            question: q.question.trim(),
            type: "theory"
          };
        }

        return {
          question: q.question.trim(),
          options: q.options.map(opt => opt.trim()),
          correctAnswer: q.answer.trim(),
          type: "mcq"
        };
      });

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

  const current = dark ? darkStyles : styles;

  return (
    <div style={current.page}>
      <div style={current.container}>
        <h2 style={current.heading}>Create Exam</h2>

        <div style={current.row}>
          <input
            style={current.input}
            placeholder="Exam Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            style={current.input}
            type="number"
            placeholder="Duration (minutes)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <h3 style={current.subHeading}>Questions</h3>

        {questions.map((q, index) => (
          <div key={index} style={current.questionBlock} className="q-block">

            <div style={current.accent}></div>

            <div style={current.qHeader}>
              <span style={current.qLabel}>Question {index + 1}</span>

              {index !== 0 && (
                <button
                  style={current.deleteBtn}
                  onClick={() => deleteQuestion(index)}
                >
                  ✕
                </button>
              )}
            </div>

            <input
              style={current.input}
              placeholder="Enter question"
              value={q.question}
              onChange={(e) =>
                handleQuestionChange(index, "question", e.target.value)
              }
            />

            <select
              style={current.input}
              value={q.type}
              onChange={(e) =>
                handleQuestionChange(index, "type", e.target.value)
              }
            >
              <option value="mcq">MCQ</option>
              <option value="theory">Theory</option>
            </select>

            {q.type === "mcq" && (
              <div style={current.optionsGrid}>
                {q.options.map((opt, i) => (
                  <input
                    key={i}
                    style={current.input}
                    placeholder={`Option ${i + 1}`}
                    value={opt}
                    onChange={(e) =>
                      handleOptionChange(index, i, e.target.value)
                    }
                  />
                ))}

                <select
                  style={current.input}
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
            )}
          </div>
        ))}

        <button style={current.secondaryBtn} onClick={addQuestion}>
          + Add Question
        </button>

        <button style={current.primaryBtn} onClick={handleSubmit}>
          Create Exam →
        </button>

        {message && <p style={current.message}>{message}</p>}
      </div>
    </div>
  );
}

/* 🌞 LIGHT */
const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px",
    background: "#f8fafc",
    fontFamily: "Inter, sans-serif"
  },

  container: {
    maxWidth: "850px",
    margin: "auto",
    padding: "35px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.8)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)"
  },

  heading: {
    textAlign: "center",
    marginBottom: "25px"
  },

  subHeading: {
    marginBottom: "15px"
  },

  row: {
    display: "flex",
    gap: "10px"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    background: "#fff"
  },

  questionBlock: {
    padding: "20px",
    marginBottom: "15px",
    borderRadius: "12px",
    position: "relative",
    background: "rgba(0,0,0,0.04)"
  },

  accent: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "4px",
    background: "#6366f1"
  },

  qHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px"
  },

  qLabel: {
    fontWeight: "600"
  },

  deleteBtn: {
    background: "transparent",
    border: "none",
    color: "red",
    cursor: "pointer"
  },

  optionsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px"
  },

  primaryBtn: {
    width: "100%",
    padding: "12px",
    background: "#6366f1",
    color: "#fff",
    border: "none",
    borderRadius: "25px",
    marginTop: "10px"
  },

  secondaryBtn: {
    width: "100%",
    padding: "12px",
    background: "#f97316",
    color: "#fff",
    border: "none",
    borderRadius: "25px"
  },

  message: {
    textAlign: "center",
    marginTop: "10px"
  }
};

/* 🌙 DARK */
const darkStyles = {
  ...styles,

  page: {
    ...styles.page,
    background: "#020617",
    color: "#fff"
  },

  container: {
    ...styles.container,
    background: "rgba(255,255,255,0.05)"
  },

  input: {
    ...styles.input,
    background: "#1e293b",
    color: "#fff",
    border: "1px solid #334155"
  },

  questionBlock: {
    ...styles.questionBlock,
    background: "rgba(255,255,255,0.05)"
  }
};

export default CreateExam;