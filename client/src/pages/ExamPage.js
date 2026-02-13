import { useEffect, useState } from "react";
import API from "../services/api";

function ExamPage() {
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  const examId = localStorage.getItem("examId");
  const attemptId = localStorage.getItem("attemptId");
  const duration = localStorage.getItem("duration"); // minutes

  // Fetch exam
  useEffect(() => {
    const fetchExam = async () => {
      const res = await API.get(`/exams/${examId}`);
      setExam(res.data);
      setTimeLeft(duration * 60); // convert to seconds
    };

    fetchExam();
  }, [examId, duration]);

  // Timer countdown
  useEffect(() => {
    if (!timeLeft) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          submitExam(); // auto submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Tab switch detection
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

  const handleAnswer = (index, value) => {
    const updated = [...answers];
    updated[index] = {
      questionId: index,
      answer: value
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

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2>{exam.title}</h2>
        <div style={styles.timer}>
          Time Left: {minutes}:{seconds < 10 ? "0" : ""}
          {seconds}
        </div>
      </div>

      <div style={styles.container}>
        {exam.questions.map((q, index) => (
          <div key={index} style={styles.card}>
            <p style={styles.question}>
              Q{index + 1}. {q.question}
            </p>

            {q.type === "mcq" &&
              q.options.map((opt, i) => (
                <label key={i} style={styles.option}>
                  <input
                    type="radio"
                    name={index}
                    onChange={() => handleAnswer(index, opt)}
                  />
                  {opt}
                </label>
              ))}

            {q.type === "theory" && (
              <textarea
                style={styles.textarea}
                onChange={(e) =>
                  handleAnswer(index, e.target.value)
                }
              />
            )}
          </div>
        ))}
      </div>

      <div style={styles.submitArea}>
        <button style={styles.submitBtn} onClick={submitExam}>
          Submit Exam
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#141514",
    minHeight: "100vh",
    color: "#d8cec5",
    padding: "20px",
    fontFamily: "Segoe UI"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px"
  },

  timer: {
    background: "#86abc5",
    color: "#141514",
    padding: "8px 15px",
    borderRadius: "8px",
    fontWeight: "bold"
  },

  container: {
    maxWidth: "800px",
    margin: "auto"
  },

  card: {
    background: "#4e514e",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.4)"
  },

  question: {
    marginBottom: "10px",
    fontWeight: "bold"
  },

  option: {
    display: "block",
    marginBottom: "5px"
  },

  textarea: {
    width: "100%",
    height: "80px",
    borderRadius: "6px",
    border: "none",
    padding: "8px"
  },

  submitArea: {
    textAlign: "center",
    marginTop: "20px"
  },

  submitBtn: {
    background: "#86abc5",
    color: "#141514",
    padding: "12px 30px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default ExamPage;
