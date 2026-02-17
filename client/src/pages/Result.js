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
    return (
      <div style={styles.loading}>
        Loading Result...
      </div>
    );
  }

  const percentage = Math.round(
    (result.score / result.total) * 100
  );

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Exam Result</h2>

        <h3 style={styles.examTitle}>{result.examTitle}</h3>

        <div style={styles.scoreBox}>
          <h1 style={styles.score}>
            {result.score} / {result.total}
          </h1>
          <p style={styles.percent}>{percentage}%</p>
        </div>

        <p style={styles.status}>
          Status: {result.status}
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
  container: {
    backgroundColor: "#141514",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    backgroundColor: "#4e514e",
    padding: "40px",
    borderRadius: "10px",
    textAlign: "center",
    color: "#d8cec5",
    width: "350px",
    boxShadow: "0 0 20px rgba(0,0,0,0.4)"
  },
  title: {
    color: "#86abc5",
    marginBottom: "10px"
  },
  examTitle: {
    marginBottom: "20px"
  },
  scoreBox: {
    backgroundColor: "#141514",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "15px"
  },
  score: {
    fontSize: "40px",
    margin: 0
  },
  percent: {
    color: "#86abc5"
  },
  status: {
    marginBottom: "20px"
  },
  button: {
    backgroundColor: "#86abc5",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    color: "#141514",
    fontWeight: "bold"
  },
  loading: {
    backgroundColor: "#141514",
    color: "#d8cec5",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};

export default Result;
