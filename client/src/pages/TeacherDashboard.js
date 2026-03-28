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
        <h1 style={styles.title}>ExamGuard - Teacher</h1>

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

      {/* MAIN CARD */}
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
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#141514",
    color: "#d8cec5",
    padding: "40px",
    fontFamily: "Segoe UI"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "50px"
  },

  title: {
    color: "#86abc5",
    fontSize: "28px"
  },

  headerActions: {
    display: "flex",
    gap: "15px"
  },

  createBtn: {
    padding: "10px 18px",
    background: "linear-gradient(135deg, #86abc5, #5f8aa6)",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "#141514"
  },

  logoutBtn: {
    padding: "10px 18px",
    background: "#4e514e",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    color: "#d8cec5"
  },

  card: {
    background: "#4e514e",
    padding: "30px",
    borderRadius: "12px",
    width: "420px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.5)"
  },

  cardTitle: {
    marginBottom: "20px",
    fontSize: "20px"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "none"
  },

  primaryBtn: {
    width: "100%",
    padding: "12px",
    background: "#86abc5",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#141514"
  }
};

export default TeacherDashboard;