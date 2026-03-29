import { useEffect, useState } from "react";
import { getMyResults } from "../services/api";

function MyResults() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const res = await getMyResults();
      setResults(res.data);
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Error loading results");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>My Results</h2>

        {results.length === 0 ? (
          <div style={styles.emptyCard}>
            <p>No exams attempted yet</p>
          </div>
        ) : (
          results.map((r) => (
            <div key={r._id} style={styles.card}>
              
              <h3 style={styles.title}>{r.exam.title}</h3>

              <p style={styles.score}>
                Score: <span>{r.score}</span>
              </p>

              <p style={styles.date}>
                📅{" "}
                {r.submittedAt
                  ? new Date(r.submittedAt).toLocaleString()
                  : "N/A"}
              </p>

            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    padding: "40px",
    fontFamily: "Segoe UI, sans-serif",
    color: "#fff"
  },

  container: {
    maxWidth: "700px",
    margin: "auto"
  },

  heading: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "28px",
    fontWeight: "600"
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    padding: "20px",
    borderRadius: "14px",
    marginBottom: "15px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.4)"
  },

  title: {
    marginBottom: "10px",
    fontSize: "18px",
    fontWeight: "600"
  },

  score: {
    fontSize: "16px",
    marginBottom: "8px"
  },

  date: {
    fontSize: "14px",
    opacity: 0.8
  },

  emptyCard: {
    textAlign: "center",
    padding: "30px",
    background: "rgba(255,255,255,0.08)",
    borderRadius: "12px"
  }
};

export default MyResults;