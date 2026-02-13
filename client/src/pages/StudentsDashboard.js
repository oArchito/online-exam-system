import { useState } from "react";
import API from "../services/api";

function StudentsDashboard() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

 const joinTest = async () => {
  try {
    const res = await API.post("/exams/join", { code });

    localStorage.setItem("attemptId", res.data.attempt._id);
    localStorage.setItem("examId", res.data.examId);
    localStorage.setItem("duration", res.data.duration);

    window.location.href = "/exam";

  } catch (err) {
    const msg =
      err.response?.data?.message ||
      "Unable to join exam";

    setMessage(msg);
  }
};


  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.logo}>Online Exam System</h1>
        <button style={styles.logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>

      <div style={styles.container}>
        {/* Join Test Card */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Join Assigned Test</h2>

          <input
            style={styles.input}
            placeholder="Enter Test Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button style={styles.primaryBtn} onClick={joinTest}>
            Join Test
          </button>

          {message && <p style={styles.error}>{message}</p>}
        </div>

        {/* Self Practice Card */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Self Practice</h2>
          <p style={styles.text}>
            Upload your own question paper and practice with real exam timer.
          </p>

          <button style={styles.primaryBtn}>
            Upload PDF & Start
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#141514",
    color: "#d8cec5",
    fontFamily: "Segoe UI, Arial",
    padding: "20px"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px"
  },

  logo: {
    margin: 0
  },

  logoutBtn: {
    background: "#d8cec5",
    color: "#141514",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  container: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap"
  },

  card: {
    background: "#4e514e",
    padding: "30px",
    borderRadius: "12px",
    width: "320px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
    textAlign: "center"
  },

  cardTitle: {
    marginBottom: "15px"
  },

  text: {
    fontSize: "14px",
    marginBottom: "20px"
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "none",
    fontSize: "15px"
  },

  primaryBtn: {
    width: "100%",
    padding: "10px",
    background: "#86abc5",
    color: "#141514",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  error: {
    color: "#ff7a7a",
    marginTop: "10px",
    fontSize: "14px"
  }
};

export default StudentsDashboard;
