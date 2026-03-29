import React, { useState } from "react";

function TeacherDashboard() {
  const [examCode, setExamCode] = useState("");

  const viewAttempts = () => {
    if (!examCode) {
      alert("Enter Exam Code");
      return;
    }

    localStorage.setItem("viewExamCode", examCode.trim());
    window.location.href = "/teacher-results";
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div style={styles.page}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>ExamGuard</h1>

        <div style={styles.headerActions}>
          <button
            style={styles.createBtn}
            onClick={() => (window.location.href = "/create-exam")}
          >
            + Create Exam
          </button>

          <button style={styles.logoutBtn} onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {/* CENTER CARD */}
      <div style={styles.centerWrapper}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>View Exam Attempts</h2>

          <input
            style={styles.input}
            placeholder="Enter Exam Code"
            value={examCode}
            onChange={(e) => setExamCode(e.target.value)}
          />

          <button style={styles.primaryBtn} onClick={viewAttempts}>
            View Attempts
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
    color: "#ffffff",
    padding: "30px",
    fontFamily: "Segoe UI, sans-serif"
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

  title: {
    fontSize: "28px",
    fontWeight: "600",
    letterSpacing: "1px"
  },

  headerActions: {
    display: "flex",
    gap: "15px"
  },

  createBtn: {
    padding: "10px 20px",
    background: "linear-gradient(135deg, #00c6ff, #0072ff)",
    border: "none",
    borderRadius: "25px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "#fff",
    transition: "0.3s",
    boxShadow: "0 5px 15px rgba(0,114,255,0.4)"
  },

  logoutBtn: {
    padding: "10px 20px",
    background: "rgba(255,255,255,0.1)",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    color: "#fff",
    transition: "0.3s"
  },

  centerWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "60px"
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    padding: "35px",
    borderRadius: "16px",
    width: "420px",
    backdropFilter: "blur(12px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
  },

  cardTitle: {
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: "600"
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
    background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#fff",
    transition: "0.3s",
    boxShadow: "0 5px 15px rgba(255,75,43,0.4)"
  }
};

export default TeacherDashboard;