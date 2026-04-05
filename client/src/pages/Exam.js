import { useState, useEffect } from "react";
import API from "../services/api";

function Exam() {
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [dark, setDark] = useState(false);

useEffect(() => {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") setDark(true);
}, []);

  const token = localStorage.getItem("token");
  const current = dark ? darkStyles : styles;
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
      if (document.hidden) {
        handleViolation();
      }
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
    <div style={current.page}>
      
      <div style={current.card}>
        <h2 style={current.title}>Exam Session</h2>

        {/* TIMER */}
        <div style={current.timer}>
          ⏱ {minutes}:{seconds}
        </div>

        {/* BUTTON */}
        <button style={current.button} onClick={startExam}>
          Start Exam
        </button>

        {/* MESSAGE */}
        {message && <p style={current.message}>{message}</p>}
      </div>

    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Segoe UI, sans-serif",
    color: "#fff"
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    padding: "40px",
    borderRadius: "16px",
    textAlign: "center",
    width: "350px",
    backdropFilter: "blur(12px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
  },

  title: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "600"
  },

  timer: {
    fontSize: "28px",
    marginBottom: "20px",
    background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
    padding: "10px 20px",
    borderRadius: "20px",
    display: "inline-block"
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg, #00c6ff, #0072ff)",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#fff",
    fontSize: "16px",
    marginBottom: "15px"
  },

  message: {
    marginTop: "10px",
    fontSize: "14px"
  }
};

export default Exam;