import { useEffect, useState } from "react";
import API from "../services/api";

function ExamPage() {
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDark(true);
  }, []);

  const examId = localStorage.getItem("examId");
  const attemptId = localStorage.getItem("attemptId");
  const duration = localStorage.getItem("duration");

  useEffect(() => {
    const fetchExam = async () => {
      const res = await API.get(`/exams/${examId}`);
      setExam(res.data);
      setTimeLeft(duration * 60);
    };
    fetchExam();
  }, [examId, duration]);

  useEffect(() => {
    if (!timeLeft) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          submitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        alert("Tab switch detected! Exam will be submitted.");
        submitExam();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  useEffect(() => {
    const preventCopyPaste = (e) => e.preventDefault();

    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        ["c", "v", "x"].includes(e.key.toLowerCase())
      ) {
        e.preventDefault();
        alert("Copy/Paste is disabled during exam");
      }
    };

    const disableRightClick = (e) => e.preventDefault();

    document.addEventListener("copy", preventCopyPaste);
    document.addEventListener("paste", preventCopyPaste);
    document.addEventListener("cut", preventCopyPaste);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", disableRightClick);

    return () => {
      document.removeEventListener("copy", preventCopyPaste);
      document.removeEventListener("paste", preventCopyPaste);
      document.removeEventListener("cut", preventCopyPaste);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  const handleAnswer = (index, value) => {
    const updated = [...answers];

    updated[index] = {
      questionId: exam.questions[index]._id,
      answer: value.trim()
    };

    setAnswers(updated);
  };

  const submitExam = async () => {
    try {
      await API.post("/exams/submit", {
        attemptId,
        answers
      });

      alert("Exam submitted");
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    }
  };

  if (!exam) return <h3 style={{ color: "#d8cec5" }}>Loading...</h3>;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const current = dark ? darkStyles : styles;

  return (
    <div style={current.page}>
      <div style={current.header}>
        <h2>{exam.title}</h2>
        <div style={current.timer}>
          Time Left: {minutes}:{seconds < 10 ? "0" : ""}
          {seconds}
        </div>
      </div>

      <div style={current.container}>
        {exam.questions.map((q, index) => (
          <div key={index} style={current.card}>
            <p style={current.question}>
              Q{index + 1}. {q.question}
            </p>

            {q.type === "mcq" &&
              q.options.map((opt, i) => (
                <label key={i} style={current.option}>
                  <input
                    type="radio"
                    name={`q-${index}`}
                    onChange={() => handleAnswer(index, opt)}
                  />
                  {opt}
                </label>
              ))}

            {q.type === "theory" && (
              <div>
                <p style={current.theoryLabel}>Write your answer:</p>

                <textarea
                  style={current.textarea}
                  placeholder="Type your answer here..."
                  onChange={(e) =>
                    handleAnswer(index, e.target.value)
                  }
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={current.submitArea}>
        <button style={current.submitBtn} onClick={submitExam}>
          Submit Exam
        </button>
      </div>
    </div>
  );
}

/* 🌞 LIGHT MODE */
const styles = {
  page: {
    background: "#f5f7fa",
    minHeight: "100vh",
    color: "#111",
    padding: "20px",
    fontFamily: "Segoe UI",
    userSelect: "none"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px"
  },
  timer: {
    background: "#3b82f6",
    color: "#fff",
    padding: "8px 15px",
    borderRadius: "8px",
    fontWeight: "bold"
  },
  container: {
    maxWidth: "800px",
    margin: "auto"
  },
  card: {
    background: "#fff",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },
  question: {
    marginBottom: "10px",
    fontWeight: "bold"
  },
  option: {
    display: "block",
    marginBottom: "5px"
  },
  submitArea: {
    textAlign: "center",
    marginTop: "20px"
  },
  submitBtn: {
    background: "#3b82f6",
    color: "#fff",
    padding: "12px 30px",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer"
  },
  theoryLabel: {
    marginBottom: "8px",
    fontSize: "14px"
  },
  textarea: {
    width: "100%",
    height: "100px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    padding: "10px"
  }
};

/* 🌙 DARK MODE */
const darkStyles = {
  ...styles,

  page: {
    ...styles.page,
    background: "#0f172a",
    color: "#fff"
  },

  card: {
    ...styles.card,
    background: "#1e293b",
    color: "#fff"
  },

  textarea: {
    ...styles.textarea,
    background: "#1e293b",
    color: "#fff",
    border: "1px solid #334155"
  }
};

export default ExamPage;