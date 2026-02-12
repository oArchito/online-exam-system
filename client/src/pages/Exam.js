import { useState, useEffect } from "react";
import API from "../services/api";

function Exam() {
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  const token = localStorage.getItem("token");
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

      // duration comes from backend (minutes)
      setTimeLeft(res.data.duration * 60);

      setMessage("Exam Started");

    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to start exam");
    }
  };

  // -------- Timer Logic --------
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // -------- Auto Submit when time = 0 --------
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

      setMessage("Exam Submitted (Time Over)");
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  // -------- Tab Switch Detection --------
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

        setMessage("Exam ended due to tab switching");
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

  return (
    <div>
      <h3>Exam Page</h3>

      <button onClick={startExam}>Start Exam</button>

      <h4>Time Left: {timeLeft} seconds</h4>

      <p>{message}</p>
    </div>
  );
}

export default Exam;
