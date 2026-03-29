import { useEffect, useState } from "react";
import axios from "axios";

function Result() {
  const [result, setResult] = useState(null);

  const attemptId = localStorage.getItem("attemptId");
  const token = localStorage.getItem("token");

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

  if (!result) {
    return <div style={styles.loading}>Loading Result...</div>;
  }

  const percentage = Math.round(
    (result.score / result.total) * 100
  );

  const isPass = percentage >= 40;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Exam Result</h2>

        <h3 style={styles.examTitle}>{result.examTitle}</h3>

        {/* SCORE */}
        <div style={styles.scoreBox}>
          <h1 style={styles.score}>
            {result.score} / {result.total}
          </h1>

          <p
            style={{
              ...styles.percent,
              color: isPass ? "#4caf50" : "#ff4b2b"
            }}
          >
            {percentage}%
          </p>
        </div>

        {/* STATUS */}
        <p
          style={{
            ...styles.status,
            color: isPass ? "#4caf50" : "#ff4b2b"
          }}
        >
          {isPass ? "✅ Passed" : "❌ Failed"}
        </p>

        <button
          style={styles.button}
          onClick={() => (window.location.href = "/")}
        >
          Back to Home
        </button>
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
    width: "360px",
    backdropFilter: "blur(12px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
  },

  title: {
    marginBottom: "10px",
    fontSize: "26px",
    fontWeight: "600"
  },

  examTitle: {
    marginBottom: "20px",
    fontSize: "16px",
    opacity: 0.8
  },

  scoreBox: {
    background: "rgba(0,0,0,0.3)",
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
    background: "linear-gradient(135deg, #00c6ff, #0072ff)",
    border: "none",
    padding: "12px 25px",
    borderRadius: "25px",
    cursor: "pointer",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "15px",
    boxShadow: "0 5px 15px rgba(0,114,255,0.4)"
  },

  loading: {
    minHeight: "100vh",
    background: "#141514",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px"
  }
};

export default Result;