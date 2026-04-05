import { useEffect, useState } from "react";
import axios from "axios";

function Result() {
  const [result, setResult] = useState(null);
  const [dark, setDark] = useState(false);

  const attemptId = localStorage.getItem("attemptId");
  const token = localStorage.getItem("token");

  // ✅ theme sync
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDark(true);
  }, []);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/exams/result/${attemptId}`,
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
    return <div style={current.loading}>Loading Result...</div>;
  }

  const percentage = Math.round(
    (result.score / result.total) * 100
  );

  const isPass = percentage >= 40;

  return (
    <div style={current.page}>
      <div style={current.card}>
        <h2 style={current.title}>Exam Result</h2>

        <h3 style={current.examTitle}>{result.examTitle}</h3>

        {/* SCORE */}
        <div style={current.scoreBox}>
          <h1 style={current.score}>
            {result.score} / {result.total}
          </h1>

          <p
            style={{
              ...current.percent,
              color: isPass ? "#4caf50" : "#ff4b2b"
            }}
          >
            {percentage}%
          </p>
        </div>

        {/* STATUS */}
        <p
          style={{
            ...current.status,
            color: isPass ? "#4caf50" : "#ff4b2b"
          }}
        >
          {isPass ? "✅ Passed" : "❌ Failed"}
        </p>

        <button
          style={current.button}
          onClick={() => (window.location.href = "/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

/* 🌞 LIGHT MODE */
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eef2ff, #e0f2fe)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Segoe UI, sans-serif",
    color: "#111"
  },

  card: {
    background: "rgba(255,255,255,0.7)",
    padding: "40px",
    borderRadius: "16px",
    textAlign: "center",
    width: "360px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
  },

  title: {
    marginBottom: "10px",
    fontSize: "26px",
    fontWeight: "600"
  },

  examTitle: {
    marginBottom: "20px",
    fontSize: "16px",
    opacity: 0.7
  },

  scoreBox: {
    background: "rgba(0,0,0,0.05)",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "15px"
  },

  score: {
    fontSize: "42px",
    margin: 0
  },

  percent: {
    fontSize: "18px",
    marginTop: "5px",
    fontWeight: "bold"
  },

  status: {
    marginBottom: "20px",
    fontSize: "16px",
    fontWeight: "bold"
  },

  button: {
    background: "linear-gradient(135deg, #6366f1, #3b82f6)",
    border: "none",
    padding: "12px 25px",
    borderRadius: "25px",
    cursor: "pointer",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "15px"
  },

  loading: {
    minHeight: "100vh",
    background: "#f5f7fa",
    color: "#111",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px"
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

  card: {
    ...styles.card,
    background: "rgba(255,255,255,0.05)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.6)"
  },

  scoreBox: {
    ...styles.scoreBox,
    background: "rgba(255,255,255,0.05)"
  },

  loading: {
    ...styles.loading,
    background: "#0f172a",
    color: "#fff"
  }
};

export default Result;