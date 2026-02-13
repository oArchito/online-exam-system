import { useEffect, useState } from "react";
import API from "../services/api";

function ExamPage() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [warning, setWarning] = useState("");

  const token = localStorage.getItem("token");
  const attemptId = localStorage.getItem("attemptId");

  // Load duration
  useEffect(() => {
    const duration = localStorage.getItem("duration");
    if (duration) {
      setTimeLeft(duration * 60);
    }
  }, []);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Auto submit when time over
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

      alert("Time over! Exam submitted.");
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    }
  };

  // Tab switch detection
  useEffect(() => {
    const handleViolation = async () => {
      if (!attemptId) return;

      setWarning("Tab switching detected! Exam ended.");

      await API.post(
        "/exams/violation",
        { attemptId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    };

    const visibilityHandler = () => {
      if (document.hidden) {
        handleViolation();
      }
    };

    window.addEventListener("blur", handleViolation);
    document.addEventListener("visibilitychange", visibilityHandler);

    return () => {
      window.removeEventListener("blur", handleViolation);
      document.removeEventListener("visibilitychange", visibilityHandler);
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Exam Running</h2>
        <h3>Time Left: {timeLeft} sec</h3>

        {warning && <p style={styles.warning}>{warning}</p>}

        <p>Do not switch tabs or minimize the window.</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8"
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center"
  },
  warning: {
    color: "red",
    fontWeight: "bold"
  }
};

export default ExamPage;
