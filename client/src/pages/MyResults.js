import { useEffect, useState } from "react";
import { getMyResults } from "../services/api";

function MyResults() {
  const [results, setResults] = useState([]);
  const [dark, setDark] = useState(false);

  // ✅ Theme sync
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
      alert("Error loading results");
    }
  };

  const current = dark ? darkStyles : styles;

  return (
    <div style={current.page}>
      {/* BACKGROUND */}
      <div style={current.gradient}></div>
      <div style={current.grid}></div>
      <div style={current.glow}></div>

      <div style={current.container}>
        <h1 style={current.heading}>
          My <span style={current.gradientText}>Results</span>
        </h1>

        <p style={current.sub}>
          Track your performance and progress
        </p>

        <div style={current.list}>
          {results.length === 0 ? (
            <div style={current.empty}>No exams attempted yet</div>
          ) : (
            results.map((r) => {
              // ✅ SAFE TOTAL FIX
              const total =
                r.exam?.totalMarks ||
                r.exam?.total ||
                r.total ||
                r.maxScore ||
                0;

              const percentage =
                total > 0
                  ? Math.round((r.score / total) * 100)
                  : null;

              return (
                <div
                  key={r._id}
                  style={current.card}
                  className="result-card"
                >
                  {/* LEFT */}
                  <div>
                    <h3 style={current.title}>
                      {r.exam?.title || "Untitled Exam"}
                    </h3>

                    <p style={current.date}>
                      {r.submittedAt
                        ? new Date(r.submittedAt).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>

                  {/* RIGHT */}
                  <div style={current.right}>
                    <div style={current.score}>
                      {r.score}
                      <span style={current.total}>
                        {" "}
                        / {total > 0 ? total : "N/A"}
                      </span>
                    </div>

                    <div
                      style={{
                        ...current.percent,
                        color:
                          percentage === null
                            ? "#94a3b8"
                            : percentage >= 40
                            ? "#22c55e"
                            : "#ef4444"
                      }}
                    >
                      {percentage !== null ? `${percentage}%` : "—"}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

/* 🌞 LIGHT MODE */
const styles = {
  page: {
    minHeight: "100vh",
    padding: "60px 20px",
    fontFamily: "Inter, sans-serif",
    position: "relative",
    overflow: "hidden",
    background: "#f8fafc",
    color: "#0f172a"
  },

  gradient: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(135deg, #e0f2fe, #c7d2fe, #f0f9ff)",
    opacity: 0.8
  },

  grid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)",
    backgroundSize: "40px 40px"
  },

  glow: {
    position: "absolute",
    width: "400px",
    height: "400px",
    background: "radial-gradient(circle, #6366f1, transparent)",
    filter: "blur(120px)",
    opacity: 0.2,
    top: "20%",
    left: "30%"
  },

  container: {
    maxWidth: "900px",
    margin: "auto",
    position: "relative",
    zIndex: 2
  },

  heading: {
    textAlign: "center",
    fontSize: "42px",
    fontWeight: "900"
  },

  gradientText: {
    background: "linear-gradient(90deg,#6366f1,#22d3ee)",
    WebkitBackgroundClip: "text",
    color: "transparent"
  },

  sub: {
    textAlign: "center",
    marginBottom: "40px",
    opacity: 0.7
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },

  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "25px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.8)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(0,0,0,0.08)",
    transition: "0.3s"
  },

  title: {
    fontSize: "18px",
    fontWeight: "600"
  },

  date: {
    fontSize: "12px",
    opacity: 0.6,
    marginTop: "5px"
  },

  right: {
    textAlign: "right"
  },

  score: {
    fontSize: "32px",
    fontWeight: "800"
  },

  total: {
    fontSize: "14px",
    opacity: 0.6
  },

  percent: {
    fontSize: "14px",
    fontWeight: "600"
  },

  empty: {
    textAlign: "center",
    padding: "30px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.6)"
  }
};

/* 🌙 DARK MODE */
const darkStyles = {
  ...styles,

  page: {
    ...styles.page,
    background: "#020617",
    color: "#fff"
  },

  gradient: {
    ...styles.gradient,
    background:
      "linear-gradient(135deg, #1e1b4b, #312e81, #0ea5e9)",
    opacity: 0.6
  },

  grid: {
    ...styles.grid,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)"
  },

  card: {
    ...styles.card,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)"
  },

  empty: {
    ...styles.empty,
    background: "rgba(255,255,255,0.05)"
  }
};

export default MyResults;