import React, { useState, useEffect } from "react";

function TeacherDashboard() {
  const [examCode, setExamCode] = useState("");
  const [dark, setDark] = useState(false);

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

      {/* BACKGROUND */}
      <div style={current.grid}></div>
      <div style={current.gradient}></div>
      <div style={current.glow}></div>

      {/* HEADER */}
      <div style={current.header}>
        <div onClick={() => (window.location.href = "/")} style={{ cursor: "pointer" }}>
          <h2 style={current.logo}>ExamGuard</h2>
          <p style={current.tag}>Secure • Monitor • Evaluate</p>
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
        <h1 style={current.heroTitle}>Teacher Dashboard</h1>
        <p style={current.heroSub}>
          Create exams, monitor students, and analyze results seamlessly
        </p>
      </div>

      {/* CENTER */}
      <div style={current.center}>
        <div style={current.card}>
          <h2 style={current.cardTitle}>View Exam Attempts</h2>

          <input
            style={current.input}
            placeholder="Enter Exam Code"
            value={examCode}
            onChange={(e) => setExamCode(e.target.value)}
          />

          <button style={current.primaryBtn} onClick={viewAttempts}>
            View Attempts →
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <div style={current.footer}>
        <h3>About ExamGuard</h3>
        <p>
          Secure online exam system designed for teachers to create, monitor,
          and evaluate student performance efficiently.
        </p>
        <p style={{ opacity: 0.6 }}>© 2026 ExamGuard</p>
      </div>

    </div>
  );
}

/* 🌞 LIGHT */
const styles = {
  page: {
    minHeight: "100vh",
    fontFamily: "Inter, sans-serif",
    position: "relative",
    overflow: "hidden",
    background: "#f8fafc",
    padding: "30px"
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
      "radial-gradient(circle at 20% 20%, rgba(99,102,241,0.2), transparent 40%), radial-gradient(circle at 80% 80%, rgba(59,130,246,0.2), transparent 40%)"
  },

  glow: {
    position: "absolute",
    width: "350px",
    height: "350px",
    background: "radial-gradient(circle, #6366f1, transparent)",
    filter: "blur(120px)",
    opacity: 0.2,
    top: "10%",
    left: "20%"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    position: "relative",
    zIndex: 2
  },

  logo: {
    fontSize: "22px",
    fontWeight: "800"
  },

  tag: {
    fontSize: "11px",
    color: "#64748b"
  },

  headerActions: {
    display: "flex",
    gap: "12px"
  },

  createBtn: {
    padding: "10px 20px",
    borderRadius: "30px",
    background: "linear-gradient(135deg,#6366f1,#3b82f6)",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  },

  logoutBtn: {
    padding: "10px 20px",
    borderRadius: "30px",
    background: "linear-gradient(135deg,#ef4444,#dc2626)",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  },

  hero: {
    textAlign: "center",
    marginBottom: "50px",
    position: "relative",
    zIndex: 2
  },

  heroTitle: {
    fontSize: "40px",
    fontWeight: "800",
    marginBottom: "10px"
  },

  heroSub: {
    opacity: 0.7
  },

  center: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    zIndex: 2
  },

  card: {
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(12px)",
    padding: "35px",
    borderRadius: "18px",
    width: "420px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
    textAlign: "center"
  },

  cardTitle: {
    marginBottom: "20px"
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "15px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1"
  },

  primaryBtn: {
    width: "100%",
    padding: "12px",
    borderRadius: "30px",
    background: "linear-gradient(135deg,#6366f1,#3b82f6)",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  },

  footer: {
    marginTop: "80px",
    textAlign: "center",
    padding: "25px",
    background: "rgba(0,0,0,0.05)",
    borderRadius: "12px"
  }
};

/* 🌙 DARK */
const darkStyles = {
  ...styles,

  page: {
    ...styles.page,
    background: "#020617",
    color: "#fff"
  },

  card: {
    ...styles.card,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)"
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