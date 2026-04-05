import React, { useState, useEffect } from "react";

function TeacherDashboard() {
  const [examCode, setExamCode] = useState("");
  const [dark, setDark] = useState(false);

  // ✅ theme sync
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDark(true);
  }, []);

  const viewAttempts = () => {
    if (!examCode) {
      alert("Enter Exam Code");
      return;
    }

    localStorage.setItem("viewExamCode", examCode.trim());
    window.location.href = "/teacher-results";
  };

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.reload();
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

        <div style={current.headerActions}>
          <button
            style={current.createBtn}
            onClick={() => (window.location.href = "/create-exam")}
          >
            + Create Exam
          </button>

          <button style={current.logoutBtn} onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {/* HERO */}
      <div style={current.hero}>
        <h2>Teacher Dashboard 👨‍🏫</h2>
        <p>Create exams, monitor students, and analyze results easily</p>
      </div>

      {/* CENTER CARD */}
      <div style={current.centerWrapper}>
        <div style={current.card}>
          <h2 style={current.cardTitle}>View Exam Attempts</h2>

          <input
            style={current.input}
            placeholder="Enter Exam Code"
            value={examCode}
            onChange={(e) => setExamCode(e.target.value)}
          />

          <button style={current.primaryBtn} onClick={viewAttempts}>
            View Attempts
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <div style={current.footer}>
        <h3>About ExamGuard</h3>
        <p>
          ExamGuard helps teachers create secure exams, monitor activity,
          and evaluate performance efficiently using modern tools.
        </p>
        <p style={{ marginTop: "10px", opacity: 0.6 }}>
          © 2026 ExamGuard • Smart Examination Platform
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
    padding: "30px",
    fontFamily: "Segoe UI, sans-serif"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },

  title: {
    fontSize: "28px",
    fontWeight: "700"
  },

  headerActions: {
    display: "flex",
    gap: "15px"
  },

  createBtn: {
    padding: "10px 20px",
    background: "linear-gradient(135deg, #6366f1, #3b82f6)",
    border: "none",
    borderRadius: "25px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "#fff"
  },

  logoutBtn: {
    padding: "10px 20px",
    background: "#e5e7eb",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer"
  },

  hero: {
    textAlign: "center",
    marginBottom: "40px"
  },

  centerWrapper: {
    display: "flex",
    justifyContent: "center"
  },

  card: {
    background: "rgba(255,255,255,0.8)",
    padding: "35px",
    borderRadius: "18px",
    width: "420px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    textAlign: "center"
  },

  cardTitle: {
    marginBottom: "20px",
    fontSize: "22px"
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
    background: "linear-gradient(135deg, #ef4444, #dc2626)",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#fff"
  },

  footer: {
    marginTop: "80px",
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

export default TeacherDashboard;