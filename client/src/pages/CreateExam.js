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

        <h3 style={current.subHeading}>Questions</h3>

        {questions.map((q, index) => (
          <div key={index} style={current.card}>
            <p style={current.questionLabel}>
              Question {index + 1}
            </p>

            <input
              style={current.input}
              placeholder="Enter question"
              value={q.question}
              onChange={(e) =>
                handleQuestionChange(index, "question", e.target.value)
              }
            />

            <select
              style={{ ...current.input, cursor: "pointer" }}
              value={q.type}
              onChange={(e) =>
                handleQuestionChange(index, "type", e.target.value)
              }
            >
              <option value="mcq">MCQ</option>
              <option value="theory">Theory</option>
            </select>

            {q.type === "mcq" && (
              <>
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
                  style={{ ...current.input, cursor: "pointer" }}
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
              </>
            )}

            {q.type === "theory" && (
              <p style={{ fontSize: "13px", opacity: 0.7 }}>
                Student will write answer (AI will evaluate)
              </p>
            )}
          </div>
        ))}

        <button style={current.secondaryBtn} onClick={addQuestion}>
          + Add Question
        </button>

        <button style={current.primaryBtn} onClick={handleSubmit}>
          Create Exam
        </button>

        {message && <p style={current.message}>{message}</p>}
      </div>
    </div>
  );
}

/* 🌞 LIGHT MODE */
const styles = {
  page: {
    background: "linear-gradient(135deg, #eef2ff, #e0f2fe)",
    minHeight: "100vh",
    padding: "40px",
    fontFamily: "Segoe UI, sans-serif",
    color: "#111"
  },

  container: {
    maxWidth: "700px",
    margin: "auto",
    background: "rgba(255,255,255,0.7)",
    padding: "35px",
    borderRadius: "16px",
    backdropFilter: "blur(12px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
  },

  heading: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "26px"
  },

  subHeading: {
    marginTop: "25px",
    marginBottom: "10px"
  },

  card: {
    background: "rgba(255,255,255,0.6)",
    padding: "18px",
    marginBottom: "15px",
    borderRadius: "12px"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },

  primaryBtn: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #6366f1, #3b82f6)",
    border: "none",
    borderRadius: "25px",
    color: "#fff",
    marginTop: "15px"
  },

  secondaryBtn: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg, #f97316, #fb923c)",
    border: "none",
    borderRadius: "25px",
    color: "#fff",
    marginTop: "10px"
  },

  message: {
    marginTop: "20px",
    textAlign: "center",
    fontWeight: "bold"
  }
};

/* 🌙 DARK MODE */
const darkStyles = {
  ...styles,

  page: {
    ...styles.page,
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "#fff"
  },

  container: {
    ...styles.container,
    background: "rgba(255,255,255,0.05)"
  },

  card: {
    ...styles.card,
    background: "rgba(255,255,255,0.05)"
  },

  input: {
    ...styles.input,
    background: "#1e293b",
    border: "1px solid #334155",
    color: "#fff"
  }
};

export default CreateExam;