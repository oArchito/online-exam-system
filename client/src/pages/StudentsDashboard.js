import { useState, useEffect } from "react";
import API from "../services/api";

function StudentsDashboard() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [duration, setDuration] = useState("");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDark(true);
  }, []);

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
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.reload();
};

  const goToResults = () => {
    window.location.href = "/my-results";
  };

  const current = dark ? darkStyles : styles;

  return (
    <div style={current.page}>
      
      {/* HEADER */}
      <div style={current.header}>
       <div
          style={{ cursor: "pointer", lineHeight: "1.2" }}
          onClick={() => (window.location.href = "/")}
        >
          <div
            style={{
              ...current.logo,
              fontWeight: "700",
              fontSize: "22px",
            }}
          >
            ExamGuard
          </div>

          <div
            style={{
              fontSize: "10px",
              color: dark ? "#94a3b8" : "#6b7280",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            Secure • Monitor • Evaluate
          </div>
        </div>

        <button style={current.logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>

      {/* HERO TEXT */}
      <div style={current.hero}>
        <h2>Welcome to your Dashboard 👋</h2>
        <p>Start exams, practice with PDFs, and track your performance</p>
      </div>

      {/* CARDS */}
      <div style={current.container}>

        <div style={current.card}>
          <h2 style={current.cardTitle}>Join Test</h2>
          <p style={current.text}>
            Enter the exam code provided by your teacher to start the test session in Captial Letters.
          </p>

          <input
            style={current.input}
            placeholder="Enter Test Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button style={current.primaryBtn} onClick={joinTest}>
            Join Test
          </button>

          {message && <p style={current.error}>{message}</p>}
        </div>

        <div style={current.card}>
          <h2 style={current.cardTitle}>Practice with PDF</h2>

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            style={current.input}
          />

          <input
            type="number"
            placeholder="Duration (minutes)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            style={current.input}
          />

          <button style={current.primaryBtn} onClick={startPractice}>
            Start Practice
          </button>
        </div>

        <div style={current.card}>
          <h2 style={current.cardTitle}>My Results</h2>

          <p style={current.text}>
            Track your performance and improve over time
          </p>

          <button style={current.primaryBtn} onClick={goToResults}>
            View Results
          </button>
        </div>

      </div>

      {/* FOOTER */}
      <div style={current.footer}>
        <h3>About ExamGuard</h3>
        <p>
          ExamGuard is a secure online examination platform that ensures fair
          testing through monitoring, timed exams, and AI-based evaluation.
        </p>
        <p style={{ marginTop: "10px", opacity: 0.6 }}>
          © 2026 ExamGuard • Built for modern education
        </p>
      </div>

    </div>
  );
}

/* 🌞 LIGHT MODE */
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eef2ff, #e0f2fe)",
    color: "#111",
    fontFamily: "Segoe UI, sans-serif",
    padding: "30px"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },

  logo: {
    fontSize: "28px",
    fontWeight: "700"
  },

  logoutBtn: {
    padding: "10px 20px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
    background: "#e5e7eb"
  },

  hero: {
    textAlign: "center",
    marginBottom: "30px"
  },

  container: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    flexWrap: "wrap"
  },

  card: {
    background: "rgba(255,255,255,0.8)",
    padding: "25px",
    borderRadius: "18px",
    width: "320px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    textAlign: "center",
    transition: "0.3s"
  },

  cardTitle: {
    marginBottom: "15px"
  },

  text: {
    marginBottom: "15px"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },

  primaryBtn: {
    width: "100%",
    padding: "12px",
    borderRadius: "25px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg, #6366f1, #3b82f6)",
    color: "#fff",
    fontWeight: "bold"
  },

  error: {
    color: "red"
  },

  footer: {
    marginTop: "60px",
    textAlign: "center",
    padding: "30px",
    background: "rgba(0,0,0,0.05)",
    borderRadius: "12px"
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
    background: "rgba(255,255,255,0.05)"
  },

  input: {
    ...styles.input,
    background: "#1e293b",
    color: "#fff",
    border: "1px solid #334155"
  },

  footer: {
    ...styles.footer,
    background: "rgba(255,255,255,0.05)"
  }
};

export default StudentsDashboard;