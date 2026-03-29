import { useEffect, useState } from "react";
import API from "../services/api";

function TeacherResults() {
  const [attempts, setAttempts] = useState([]);
  const [examTitle, setExamTitle] = useState("");
  const [total, setTotal] = useState(0);

  const examCode = localStorage.getItem("viewExamCode");

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

  return (
    <div style={styles.page}>
      
      <h1 style={styles.title}>Exam Analytics</h1>

      {/* SUMMARY CARD */}
      <div style={styles.card}>
        <h2>{examTitle || "Exam Results"}</h2>
        <p>Total Attempts: <strong>{total}</strong></p>
      </div>

      {/* TABLE */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
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
              <tr key={a._id} style={styles.row}>
                <td>{a.user?.name}</td>
                <td>{a.user?.email}</td>
                <td style={styles.score}>{a.score}</td>
                <td
                  style={{
                    color:
                      a.status === "submitted"
                        ? "#4caf50"
                        : "#ff9800"
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

      <button style={styles.backBtn} onClick={goBack}>
        ← Back to Dashboard
      </button>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    color: "#fff",
    padding: "40px",
    fontFamily: "Segoe UI, sans-serif"
  },

  title: {
    marginBottom: "20px",
    fontSize: "28px",
    fontWeight: "600"
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.4)"
  },

  tableContainer: {
    background: "rgba(255,255,255,0.08)",
    padding: "20px",
    borderRadius: "12px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
    overflowX: "auto"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  },

  row: {
    borderBottom: "1px solid rgba(255,255,255,0.1)"
  },

  score: {
    fontWeight: "bold",
    color: "#00c6ff"
  },

  backBtn: {
    marginTop: "25px",
    padding: "12px 25px",
    background: "linear-gradient(135deg, #00c6ff, #0072ff)",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#fff",
    boxShadow: "0 5px 15px rgba(0,114,255,0.4)"
  }
};

export default TeacherResults;