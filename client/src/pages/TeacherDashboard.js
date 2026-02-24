import React, { useState } from "react";

function TeacherDashboard() {
  const [examCode, setExamCode] = useState("");

  const viewAttempts = () => {
    if (!examCode) {
      alert("Enter Exam Code");
      return;
    }

    // Save examCode for TeacherResults
    localStorage.setItem("viewExamCode", examCode.trim());

    window.location.href = "/teacher-results";
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>ExamGuard - Teacher</h1>
        <button style={styles.logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>

      {/* Card */}
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
    marginBottom: "40px"
  },
  title: {
    color: "#86abc5"
  },
  logoutBtn: {
    padding: "10px 18px",
    background: "#86abc5",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold"
  },
  card: {
    background: "#4e514e",
    padding: "25px",
    borderRadius: "10px",
    width: "420px"
  },
  cardTitle: {
    marginBottom: "15px"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "4px",
    border: "none"
  },
  primaryBtn: {
    width: "100%",
    padding: "10px",
    background: "#86abc5",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

export default TeacherDashboard;