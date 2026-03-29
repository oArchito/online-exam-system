import { useState } from "react";
import API from "../services/api";

function StudentsDashboard() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [duration, setDuration] = useState("");

  const token = localStorage.getItem("token");

  const joinTest = async () => {
    try {
      const res = await API.post("/exams/join", { code });

      localStorage.setItem("attemptId", res.data.attempt._id);
      localStorage.setItem("examId", res.data.examId);
      localStorage.setItem("duration", res.data.duration);

      window.location.href = "/exam";
    } catch (err) {
      const msg = err.response?.data?.message || "Unable to join exam";
      setMessage(msg);
    }
  };

  const startPractice = async () => {
    try {
      if (!file || !duration) {
        return alert("Upload PDF and enter duration");
      }

      const formData = new FormData();
      formData.append("pdf", file);

      const res = await API.post("/pdf/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      localStorage.setItem("pdfUrl", res.data.fileUrl);
      localStorage.setItem("practiceDuration", duration);

      window.location.href = "/practice";
    } catch (err) {
      console.log(err);
      alert("Upload failed");
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const goToResults = () => {
    window.location.href = "/my-results";
  };

  return (
    <div style={styles.page}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.logo}>ExamGuard</h1>

        <button style={styles.logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>

      {/* CARDS */}
      <div style={styles.container}>

        {/* JOIN TEST */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Join Test</h2>

          <input
            style={styles.input}
            placeholder="Enter Test Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button style={styles.primaryBtn} onClick={joinTest}>
            Join Test
          </button>

          {message && <p style={styles.error}>{message}</p>}
        </div>

        {/* PRACTICE */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Practice with your Own PDF</h2>

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            style={styles.input}
          />

          <input
            type="number"
            placeholder="Duration (minutes)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            style={styles.input}
          />

          <button style={styles.primaryBtn} onClick={startPractice}>
            Start Practice
          </button>
        </div>

        {/* RESULTS */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>My Results</h2>

          <p style={styles.text}>
            View your past exam performance
          </p>

          <button style={styles.primaryBtn} onClick={goToResults}>
            View Results
          </button>
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    color: "#fff",
    fontFamily: "Segoe UI, sans-serif",
    padding: "30px"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
    padding: "15px 20px",
    background: "rgba(255,255,255,0.05)",
    borderRadius: "12px",
    backdropFilter: "blur(10px)"
  },

  logo: {
    margin: 0,
    fontSize: "26px",
    fontWeight: "600"
  },

  logoutBtn: {
    background: "rgba(255,255,255,0.1)",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "20px",
    cursor: "pointer"
  },

  container: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    flexWrap: "wrap"
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    padding: "25px",
    borderRadius: "16px",
    width: "320px",
    backdropFilter: "blur(12px)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
    textAlign: "center",
    transition: "0.3s"
  },

  cardTitle: {
    marginBottom: "15px",
    fontSize: "20px",
    fontWeight: "600"
  },

  text: {
    fontSize: "14px",
    marginBottom: "20px",
    color: "#ddd"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    fontSize: "14px"
  },

  primaryBtn: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg, #00c6ff, #0072ff)",
    color: "#fff",
    border: "none",
    borderRadius: "25px",
    fontSize: "15px",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 5px 15px rgba(0,114,255,0.4)"
  },

  error: {
    color: "#ff6b6b",
    marginTop: "10px",
    fontSize: "14px"
  }
};

export default StudentsDashboard;