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
    <div style={{ padding: "20px" }}>
      <h2>My Past Results</h2>

      {results.length === 0 ? (
        <p>No exams attempted yet</p>
      ) : (
        results.map((r) => (
          <div
            key={r._id}
            style={{
              border: "1px solid #4e514e",
              padding: "15px",
              marginBottom: "10px",
              background: "#141514",
              color: "#d8cec5"
            }}
          >
            <h3>{r.exam.title}</h3>
            <p>Score: {r.score}</p>
            <p>Date: {new Date(r.startTime).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyResults;
