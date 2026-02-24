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
      console.log("Fetching for examCode:", examCode);

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

      <div style={styles.card}>
        <h2>{examTitle || "Exam Results"}</h2>
        <p>Total Attempts: {total}</p>
      </div>

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
              <tr key={a._id}>
                <td>{a.user?.name}</td>
                <td>{a.user?.email}</td>
                <td>{a.score}</td>
                <td>{a.status}</td>
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
        Back
      </button>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#141514",
    color: "#d8cec5",
    padding: "40px"
  },
  title: {
    color: "#86abc5"
  },
  card: {
    background: "#4e514e",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px"
  },
  tableContainer: {
    background: "#4e514e",
    padding: "20px",
    borderRadius: "10px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  backBtn: {
    marginTop: "20px",
    padding: "10px 20px",
    background: "#86abc5",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

export default TeacherResults;