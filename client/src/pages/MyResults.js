import { useEffect, useState } from "react";
import { getMyResults } from "../services/api";

function MyResults() {
  const [results, setResults] = useState([]);
  const [dark, setDark] = useState(false);

  // ✅ theme sync
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDark(true);
  }, []);

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

  const current = dark ? darkStyles : styles;

  return (
    <div style={current.page}>
      <div style={current.container}>
        <h2 style={current.heading}>My Results</h2>

        {results.length === 0 ? (
          <div style={current.emptyCard}>
            <p>No exams attempted yet</p>
          </div>
        ) : (
          results.map((r) => (
            <div key={r._id} style={current.card}>
              
              <h3 style={current.title}>{r.exam.title}</h3>

              <p style={current.score}>
                Score: <span>{r.score}</span>
              </p>

              <p style={current.date}>
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

/* 🌞 LIGHT MODE */
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eef2ff, #e0f2fe)",
    padding: "40px",
    fontFamily: "Segoe UI, sans-serif",
    color: "#111"
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
    background: "rgba(255,255,255,0.7)",
    padding: "20px",
    borderRadius: "14px",
    marginBottom: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
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
    opacity: 0.7
  },

  emptyCard: {
    textAlign: "center",
    padding: "30px",
    background: "rgba(255,255,255,0.7)",
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
    background: "rgba(255,255,255,0.05)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.6)"
  },

  emptyCard: {
    ...styles.emptyCard,
    background: "rgba(255,255,255,0.05)"
  },

  date: {
    ...styles.date,
    color: "#ccc"
  }
};

export default MyResults;