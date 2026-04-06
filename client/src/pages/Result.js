import { useEffect, useState } from "react";
import axios from "axios";

function Result() {
  const [result, setResult] = useState(null);
  const [dark, setDark] = useState(false);

  const attemptId = localStorage.getItem("attemptId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDark(true);
  }, []);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await axios.get(
          `https://online-exam-system-w05s.onrender.com/api/exams/result/${attemptId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setResult(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchResult();
  }, []);

  const current = dark ? darkStyles : styles;

  if (!result) {
    return (
      <div style={current.loadingPage}>
        <div style={current.grid}></div>
        <div style={current.gradient}></div>
        <div style={current.glow}></div>

        <h2 style={current.loadingText}>Loading Result...</h2>
      </div>
    );
  }

  const percentage = Math.round(
    (result.score / result.total) * 100
  );

  const isPass = percentage >= 40;

  return (
    <div style={current.page}>

      {/* BACKGROUND */}
      <div style={current.grid}></div>
      <div style={current.gradient}></div>
      <div style={current.glow}></div>

      {/* CONTENT */}
      <div style={current.container}>

        <h1 style={current.title}>Exam Result</h1>

        <p style={current.examTitle}>{result.examTitle}</p>

        {/* SCORE CIRCLE */}
        <div style={current.scoreWrapper}>
          <div style={current.scoreCircle}>
            <h1 style={current.score}>
              {result.score}/{result.total}
            </h1>
            <p style={current.percent}>{percentage}%</p>
          </div>
        </div>

        {/* STATUS */}
        <p
          style={{
            ...current.status,
            color: isPass ? "#22c55e" : "#ef4444"
          }}
        >
          {isPass ? "✔ Passed" : "✖ Failed"}
        </p>

        {/* BUTTON */}
        <button
          style={current.button}
          onClick={() => (window.location.href = "/")}
        >
          Back to Home →
        </button>
      </div>
    </div>
  );
}

/* 🌞 LIGHT */
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Inter, sans-serif",
    position: "relative",
    overflow: "hidden",
    background: "#f8fafc"
  },

  /* BACKGROUND */
  grid: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)",
    backgroundSize: "40px 40px"
  },

  gradient: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background:
      "radial-gradient(circle at 20% 20%, rgba(99,102,241,0.15), transparent 40%), radial-gradient(circle at 80% 80%, rgba(59,130,246,0.15), transparent 40%)"
  },

  glow: {
    position: "absolute",
    width: "350px",
    height: "350px",
    pointerEvents: "none",
    background: "radial-gradient(circle, #6366f1, transparent)",
    filter: "blur(120px)",
    opacity: 0.2,
    top: "10%",
    left: "30%"
  },

  container: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    padding: "40px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)"
  },

  title: {
    fontSize: "32px",
    fontWeight: "800",
    marginBottom: "10px"
  },

  examTitle: {
    marginBottom: "25px",
    opacity: 0.7
  },

  scoreWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px"
  },

  scoreCircle: {
    width: "160px",
    height: "160px",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#6366f1,#3b82f6)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    boxShadow: "0 10px 40px rgba(99,102,241,0.5)"
  },

  score: {
    margin: 0,
    fontSize: "28px"
  },

  percent: {
    fontSize: "18px",
    fontWeight: "bold"
  },

  status: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "20px"
  },

  button: {
    padding: "12px 25px",
    borderRadius: "30px",
    background: "linear-gradient(135deg,#6366f1,#3b82f6)",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: "600"
  },

  loadingPage: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    background: "#f8fafc"
  },

  loadingText: {
    position: "relative",
    zIndex: 2
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
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)"
  },

  loadingPage: {
    ...styles.loadingPage,
    background: "#020617",
    color: "#fff"
  }
};

export default Result;