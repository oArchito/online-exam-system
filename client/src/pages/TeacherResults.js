import { useEffect, useState } from "react";
import API from "../services/api";

function TeacherResults() {
  const [attempts, setAttempts] = useState([]);
  const [examTitle, setExamTitle] = useState("");
  const [total, setTotal] = useState(0);
  const [dark, setDark] = useState(false);

  const examCode = localStorage.getItem("viewExamCode");

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
      alert("Error loading attempts");
    }
  };

  const goBack = () => {
    window.location.href = "/teacher";
  };

  const current = dark ? darkStyles : styles;

  return (
    <div style={current.page}>

      {/* BACKGROUND */}
      <div style={current.grid}></div>
      <div style={current.gradient}></div>
      <div style={current.glow}></div>

      {/* CONTENT */}
      <div style={current.container}>

        <h1 style={current.title}>Exam Analytics 📊</h1>

        {/* SUMMARY */}
        <div style={current.summary}>
          <h2>{examTitle || "Exam Results"}</h2>
          <p>Total Attempts: <strong>{total}</strong></p>
        </div>

        {/* TABLE */}
        <div style={current.tableWrapper}>
          <table style={current.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Score</th>
                <th>Status</th>
                <th>Submitted</th>
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
                          : "#f59e0b",
                      fontWeight: "600"
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
            ExamGuard Analytics helps track student performance and improve learning outcomes.
          </p>
          <p style={{ opacity: 0.6 }}>© 2026 ExamGuard</p>
        </div>

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
    background: "#f8fafc"
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
    width: "350px",
    height: "350px",
    pointerEvents: "none",
    background: "radial-gradient(circle, #6366f1, transparent)",
    filter: "blur(120px)",
    opacity: 0.2,
    top: "10%",
    left: "30%"
  },

  container: {
    position: "relative",
    zIndex: 2,
    padding: "40px"
  },

  title: {
    fontSize: "34px",
    fontWeight: "800",
    marginBottom: "20px"
  },

  summary: {
    background: "rgba(255,255,255,0.7)",
    padding: "20px",
    borderRadius: "14px",
    marginBottom: "20px",
    backdropFilter: "blur(10px)"
  },

  tableWrapper: {
    background: "rgba(255,255,255,0.8)",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  },

  row: {
    borderBottom: "1px solid #e5e7eb"
  },

  score: {
    fontWeight: "bold",
    color: "#6366f1"
  },

  backBtn: {
    marginTop: "25px",
    padding: "12px 25px",
    borderRadius: "30px",
    background: "linear-gradient(135deg,#6366f1,#3b82f6)",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  },

  footer: {
    marginTop: "50px",
    textAlign: "center",
    padding: "20px",
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

  summary: {
    ...styles.summary,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)"
  },

  tableWrapper: {
    ...styles.tableWrapper,
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