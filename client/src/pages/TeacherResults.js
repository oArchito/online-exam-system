import { useEffect, useState } from "react";
import API from "../services/api";

function TeacherResults() {
  const [attempts, setAttempts] = useState([]);
  const [examTitle, setExamTitle] = useState("");
  const [total, setTotal] = useState(0);
  const [dark, setDark] = useState(false);

  const examCode = localStorage.getItem("viewExamCode");

  // ✅ theme sync
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDark(true);
  }, []);

  useEffect(() => {
    if (!examCode) {
      alert("No exam code found. Go back and enter again.");
      window.location.href = "/teacher";
      return;
    }

    fetchAttempts();
  }, []);

  const fetchAttempts = async () => {
    try {
      const res = await API.get(`/exams/code/${examCode}/attempts`);

      setAttempts(res.data.attempts);
      setTotal(res.data.totalAttempts);

      if (res.data.attempts.length > 0) {
        setExamTitle(res.data.attempts[0].exam.title);
      }
    } catch (err) {
      console.log(err.response || err);
      alert("Error loading attempts");
    }
  };

  const goBack = () => {
    window.location.href = "/teacher";
  };

  const current = dark ? darkStyles : styles;

  return (
    <div style={current.page}>
      
      {/* HEADER */}
      <h1 style={current.title}>Exam Analytics 📊</h1>

      {/* SUMMARY */}
      <div style={current.card}>
        <h2>{examTitle || "Exam Results"}</h2>
        <p>Total Attempts: <strong>{total}</strong></p>
      </div>

      {/* TABLE */}
      <div style={current.tableContainer}>
        <table style={current.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Score</th>
              <th>Status</th>
              <th>Submitted At</th>
            </tr>
          </thead>

          <tbody>
            {attempts.map((a) => (
              <tr key={a._id} style={current.row}>
                <td>{a.user?.name}</td>
                <td>{a.user?.email}</td>
                <td style={current.score}>{a.score}</td>
                <td
                  style={{
                    color:
                      a.status === "submitted"
                        ? "#22c55e"
                        : "#f59e0b"
                  }}
                >
                  {a.status}
                </td>
                <td>
                  {a.submittedAt
                    ? new Date(a.submittedAt).toLocaleString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* BUTTON */}
      <button style={current.backBtn} onClick={goBack}>
        ← Back to Dashboard
      </button>

      {/* FOOTER */}
      <div style={current.footer}>
        <p>
          ExamGuard Analytics provides insights into student performance,
          helping educators make better decisions.
        </p>
        <p style={{ opacity: 0.6 }}>© 2026 ExamGuard</p>
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
    padding: "40px",
    fontFamily: "Segoe UI, sans-serif"
  },

  title: {
    marginBottom: "20px",
    fontSize: "30px",
    fontWeight: "700"
  },

  card: {
    background: "rgba(255,255,255,0.8)",
    padding: "20px",
    borderRadius: "14px",
    marginBottom: "20px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)"
  },

  tableContainer: {
    background: "rgba(255,255,255,0.8)",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    overflowX: "auto"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  },

  row: {
    borderBottom: "1px solid #ddd"
  },

  score: {
    fontWeight: "bold",
    color: "#3b82f6"
  },

  backBtn: {
    marginTop: "25px",
    padding: "12px 25px",
    background: "linear-gradient(135deg, #6366f1, #3b82f6)",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#fff"
  },

  footer: {
    marginTop: "60px",
    textAlign: "center",
    padding: "20px",
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

  tableContainer: {
    ...styles.tableContainer,
    background: "rgba(255,255,255,0.05)"
  },

  row: {
    ...styles.row,
    borderBottom: "1px solid rgba(255,255,255,0.1)"
  },

  footer: {
    ...styles.footer,
    background: "rgba(255,255,255,0.05)"
  }
};

export default TeacherResults;