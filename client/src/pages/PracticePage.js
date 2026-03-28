import { useEffect, useState } from "react";

function PracticePage() {
  const pdfUrl = localStorage.getItem("pdfUrl");
  const duration = localStorage.getItem("practiceDuration");

  const [timeLeft, setTimeLeft] = useState(duration * 60);

  // TIMER
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          alert("Time up! Practice ended.");
          window.location.href = "/";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // TAB SWITCH DETECTION
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        alert("Violation detected! Practice ended.");
        window.location.href = "/";
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div style={styles.page}>
      <h2>Practice Exam</h2>

      <div style={styles.timer}>
        Time Left: {Math.floor(timeLeft / 60)}:
        {("0" + (timeLeft % 60)).slice(-2)}
      </div>

      <iframe
        src={`http://localhost:5000${pdfUrl}`}
        title="PDF"
        style={styles.pdf}
      />
    </div>
  );
}

export default PracticePage;

const styles = {
  page: {
    background: "#141514",
    color: "#d8cec5",
    minHeight: "100vh",
    padding: "20px"
  },
  timer: {
    background: "#86abc5",
    padding: "10px",
    marginBottom: "10px",
    fontWeight: "bold"
  },
  pdf: {
    width: "100%",
    height: "80vh",
    border: "none"
  }
};