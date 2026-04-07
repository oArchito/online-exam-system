import { useState, useEffect } from "react";
import API from "../services/api";

function Exam() {
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [dark, setDark] = useState(true); // always dark

  const token = localStorage.getItem("token");
  const current = styles;
  const attemptId = localStorage.getItem("attemptId");

  // -------- Start Exam --------
  const startExam = async () => {
    try {
      const res = await API.post(
        "/exams/start",
        {
          examId: "698d5d3f196fd7918f4d3549"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      localStorage.setItem("attemptId", res.data.attempt._id);

      setTimeLeft(res.data.duration * 60);
      setMessage("✅ Exam Started");

    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Failed to start exam");
    }
  };

  // -------- Timer --------
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // -------- Auto Submit --------
  useEffect(() => {
    if (timeLeft === 0 && attemptId) {
      submitExam();
    }
  }, [timeLeft]);

  const submitExam = async () => {
    try {
      await API.post(
        "/exams/submit",
        { attemptId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage("⏱ Exam Submitted (Time Over)");
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  // -------- Tab Switch --------
  useEffect(() => {
    const handleViolation = async () => {
      if (!attemptId) return;

      try {
        await API.post(
          "/exams/violation",
          { attemptId },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setMessage("⚠️ Exam ended due to tab switching");
      } catch (err) {
        console.log(err.response?.data);
      }
    };

    const visibilityHandler = () => {
      if (document.hidden) handleViolation();
    };

    const blurHandler = () => {
      handleViolation();
    };

    document.addEventListener("visibilitychange", visibilityHandler);
    window.addEventListener("blur", blurHandler);

    return () => {
      document.removeEventListener("visibilitychange", visibilityHandler);
      window.removeEventListener("blur", blurHandler);
    };
  }, [attemptId]);

  // -------- FORMAT TIME --------
  const minutes = Math.floor(timeLeft / 60);
  const seconds = ("0" + (timeLeft % 60)).slice(-2);

 return (
  <div style={styles.page}>

    {/* BACKGROUND */}
    <div style={styles.gradient}></div>
    <div style={styles.grid}></div>
    <div style={styles.glow}></div>

    {/* TOP BAR */}
    <div style={styles.topBar}>
      <h2 style={styles.examTitle}>Exam Mode</h2>

      <div style={styles.timer}>
        ⏱ {minutes}:{seconds}
      </div>
    </div>

    {/* MAIN */}
    <div style={styles.container}>

      <div style={styles.questionCard} className="q-card">

        <h3 style={styles.question}>
          Q1. { /* your question text */ }
        </h3>

        <div style={styles.options}>
          {/* KEEP YOUR EXISTING OPTIONS LOGIC */}
        </div>

      </div>

      <button style={styles.submitBtn}>
        Submit Exam →
      </button>

    </div>
  </div>
);
}

/* 🔥 PREMIUM DARK UI */
const styles = {
  page: {
    minHeight: "100vh",
    fontFamily: "Inter, sans-serif",
    position: "relative",
    overflow: "hidden",
    background: "#020617",
    color: "#fff"
  },

  gradient: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(135deg, #1e1b4b, #312e81, #0ea5e9)",
    opacity: 0.5
  },

  grid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
    backgroundSize: "40px 40px"
  },

  glow: {
    position: "absolute",
    width: "500px",
    height: "500px",
    background: "radial-gradient(circle, #6366f1, transparent)",
    filter: "blur(140px)",
    opacity: 0.3,
    top: "20%",
    left: "30%"
  },

  topBar: {
    position: "fixed",
    top: 0,
    width: "100%",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "rgba(2,6,23,0.8)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    zIndex: 10
  },

  examTitle: {
    fontSize: "18px",
    fontWeight: "600"
  },

  timer: {
    padding: "10px 18px",
    borderRadius: "20px",
    background: "linear-gradient(135deg,#6366f1,#3b82f6)",
    fontWeight: "600"
  },

  container: {
    paddingTop: "120px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "30px"
  },

  questionCard: {
    width: "600px",
    maxWidth: "90%",
    padding: "30px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.6)"
  },

  question: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "20px"
  },

  options: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },

  submitBtn: {
    padding: "14px 40px",
    borderRadius: "30px",
    background: "linear-gradient(135deg,#22c55e,#16a34a)",
    border: "none",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer"
  }
};

export default Exam;