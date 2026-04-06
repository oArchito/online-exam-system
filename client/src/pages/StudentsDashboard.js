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

  const joinTest = async () => {
    try {
      const res = await API.post("/exams/join", { code });

      localStorage.setItem("attemptId", res.data.attempt._id);
      localStorage.setItem("examId", res.data.examId);
      localStorage.setItem("duration", res.data.duration);

      window.location.href = "/exam";
    } catch (err) {
      setMessage(err.response?.data?.message || "Unable to join exam");
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
        headers: { "Content-Type": "multipart/form-data" }
      });

      localStorage.setItem("pdfUrl", res.data.fileUrl);
      localStorage.setItem("practiceDuration", duration);

      window.location.href = "/practice";
    } catch {
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

  const current = dark ? darkStyles : styles;

  return (
    <div style={current.page}>

      {/* BACKGROUND */}
      <div style={current.grid}></div>
      <div style={current.gradient}></div>
      <div style={current.glow}></div>

      {/* SIDEBAR */}
      <div style={current.sidebar}>
        <div>
          <h2 style={current.logo}>ExamGuard</h2>
          <p style={current.tag}>Secure • Monitor • Evaluate</p>

          <div style={current.nav}>
            <div style={current.navItem}>Dashboard</div>
            <div style={current.navItem}>Join Exam</div>
            <div style={current.navItem}>Practice</div>
            <div style={current.navItem}>Results</div>
          </div>
        </div>

        <button style={current.logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div style={current.main}>

        <h1 style={current.title}>Student Dashboard</h1>

        {/* JOIN */}
        <div style={current.panel}>
          <h3 style={current.heading}>Join Exam</h3>

          <input
            style={current.input}
            placeholder="Enter Exam Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button style={current.primaryBtn} onClick={joinTest}>
            Join Test →
          </button>

          {message && <p style={current.error}>{message}</p>}
        </div>

        {/* PRACTICE */}
        <div style={current.panel}>
          <h3 style={current.heading}>PDF Practice</h3>

          <input
            type="file"
            style={current.input}
            onChange={(e) => setFile(e.target.files[0])}
          />

          <input
            type="number"
            placeholder="Duration (minutes)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            style={current.input}
          />

          <button style={current.primaryBtn} onClick={startPractice}>
            Start Practice →
          </button>
        </div>

        {/* RESULTS */}
        <div style={current.panel}>
          <h3 style={current.heading}>My Results</h3>

          <button style={current.primaryBtn} onClick={goToResults}>
            View Results →
          </button>
        </div>

      </div>
    </div>
  );
}

/* 🌞 LIGHT */
const styles = {
  page: {
    display: "flex",
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: "Inter, sans-serif",
    position: "relative",
    overflow: "hidden"
  },

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
    width: "300px",
    height: "300px",
    pointerEvents: "none",
    background: "radial-gradient(circle, #6366f1, transparent)",
    filter: "blur(100px)",
    opacity: 0.15,
    top: "10%",
    left: "20%"
  },

  sidebar: {
    width: "230px",
    padding: "25px",
    background: "#ffffff",
    borderRight: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    zIndex: 2
  },

  logo: { fontWeight: "800", fontSize: "22px" },

  tag: { fontSize: "12px", color: "#64748b", marginBottom: "30px" },

  nav: { display: "flex", flexDirection: "column", gap: "14px" },

  navItem: {
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer"
  },

  logoutBtn: {
    padding: "12px",
    borderRadius: "30px",
    background: "linear-gradient(135deg,#ef4444,#f97316)",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  },

  main: { flex: 1, padding: "40px", zIndex: 2 },

  title: { fontSize: "34px", fontWeight: "800", marginBottom: "30px" },

  panel: {
    padding: "25px",
    borderRadius: "16px",
    marginBottom: "25px",
    background: "#ffffff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
  },

  heading: { marginBottom: "15px" },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "15px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1"
  },

  primaryBtn: {
    padding: "12px 20px",
    borderRadius: "30px",
    background: "linear-gradient(135deg,#6366f1,#3b82f6)",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  },

  error: { color: "red" }
};

/* 🌙 DARK */
const darkStyles = {
  ...styles,

  page: { ...styles.page, background: "#020617", color: "#fff" },

  sidebar: {
    ...styles.sidebar,
    background: "linear-gradient(180deg,#020617,#0f172a)",
    borderRight: "1px solid rgba(255,255,255,0.1)"
  },

  panel: {
    ...styles.panel,
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.08)"
  },

  input: {
    ...styles.input,
    background: "#1e293b",
    border: "1px solid #334155",
    color: "#fff"
  }
};

export default StudentsDashboard;