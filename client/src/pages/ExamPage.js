import { useEffect, useState } from "react";
import API from "../services/api";

function ExamPage() {
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);


  const examId = localStorage.getItem("examId");
  const attemptId = localStorage.getItem("attemptId");
  const duration = localStorage.getItem("duration");

  // -------- FETCH EXAM --------
  useEffect(() => {
    const fetchExam = async () => {
      const res = await API.get(`/exams/${examId}`);
      setExam(res.data);
      setTimeLeft(duration * 60);
    };
    fetchExam();
  }, [examId, duration]);

  // -------- TIMER --------
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

  // -------- TAB SWITCH --------
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        alert("Tab switch detected!");
        submitExam();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // -------- HANDLE ANSWER --------
  const handleAnswer = (index, value) => {
    const updated = [...answers];

    updated[index] = {
      questionId: exam.questions[index]._id,
      answer: value.trim()
    };

    setAnswers(updated);
    
  };

  // -------- SUBMIT --------
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

  if (!exam) return <h3 style={{ color: "#fff" }}>Loading...</h3>;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div style={styles.page}>

      {/* BACKGROUND */}
      <div style={styles.gradient}></div>
      <div style={styles.grid}></div>

      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.logo}>{exam.title}</h2>

        <div style={styles.rulesInline}>
          ⚠ No tab switch • No copy/paste • Auto submit
        </div>

        <div style={styles.rightSection}>
          <div style={styles.timer}>
            ⏱ {minutes}:{seconds < 10 ? "0" : ""}{seconds}
          </div>

          <button style={styles.submitBtn} onClick={submitExam}>
            Submit
          </button>
        </div>
      </div>

      {/* QUESTIONS */}
      <div style={styles.container}>
        {exam.questions.map((q, index) => (
          <div key={index} style={styles.card} className="question-card">
            <p style={styles.question}>
              Q{index + 1}. {q.question}
            </p>

            {/* MCQ */}
            {q.type === "mcq" &&
              q.options.map((opt, i) => (
                <label key={i} style={styles.option}>
                  <input
                    type="radio"
                    name={`q-${index}`}
                    onChange={() => handleAnswer(index, opt)}
                  />
                  {opt}
                </label>
              ))}

            {/* THEORY */}
            {q.type === "theory" && (
              <textarea
                style={styles.textarea}
                placeholder="Write your answer..."
                onChange={(e) =>
                  handleAnswer(index, e.target.value)
                }
              />
            )}
          </div>
        ))}
      </div>

    </div>
  );
}

/* 🔥 STYLES */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#020617",
    color: "#fff",
    fontFamily: "Inter, sans-serif"
  },

  gradient: {
    position: "fixed",
    inset: 0,
    background: "linear-gradient(135deg,#1e1b4b,#312e81,#0ea5e9)",
    opacity: 0.5,
    pointerEvents: "none"
  },

  grid: {
    position: "fixed",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
    backgroundSize: "40px 40px",
    pointerEvents: "none"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    position: "sticky",
    top: 0,
    backdropFilter: "blur(12px)",
    background: "rgba(2,6,23,0.8)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    zIndex: 10
  },

  logo: {
    fontSize: "18px",
    fontWeight: "600"
  },

  rulesInline: {
    fontSize: "13px",
    opacity: 0.7
  },

  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },

  timer: {
    padding: "8px 14px",
    borderRadius: "20px",
    background: "linear-gradient(135deg,#6366f1,#3b82f6)",
    fontWeight: "600"
  },

  submitBtn: {
    padding: "8px 18px",
    borderRadius: "20px",
    background: "linear-gradient(135deg,#22c55e,#16a34a)",
    border: "none",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s"
  },

  container: {
    maxWidth: "1000px",
    margin: "auto",
    padding: "40px 20px"
  },

  card: {
    background: "rgba(255,255,255,0.05)",
    padding: "25px",
    borderRadius: "16px",
    marginBottom: "25px",
    border: "1px solid transparent",
    
  },

  activeCard: {
    border: "1px solid #6366f1",
    boxShadow: "0 0 25px rgba(99,102,241,0.6)",
    transform: "scale(1.02)",
    background: "rgba(99,102,241,0.08)"
  },

  question: {
    fontWeight: "600",
    marginBottom: "15px"
  },

  option: {
    display: "block",
    marginBottom: "10px",
    cursor: "pointer"
  },

  textarea: {
    width: "100%",
    height: "120px",
    borderRadius: "10px",
    padding: "10px",
    background: "rgba(255,255,255,0.05)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.2)"
  }
};

export default ExamPage;