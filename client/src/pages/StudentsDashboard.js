import { useState } from "react";
import API from "../services/api";

function StudentDashboard() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const joinTest = async () => {
    try {
      const res = await API.post(
        "/exams/join",
        { code },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      localStorage.setItem("attemptId", res.data.attempt._id);
      localStorage.setItem("duration", res.data.duration);

      window.location.href = "/exam";
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to join");
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Student Dashboard</h2>

        <input
          style={styles.input}
          placeholder="Enter Test Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button style={styles.button} onClick={joinTest}>
          Join Test
        </button>

        {message && <p style={styles.message}>{message}</p>}

        <button style={styles.logout} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8"
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "300px"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    fontSize: "16px"
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "16px"
  },
  logout: {
    marginTop: "15px",
    background: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "8px",
    width: "100%",
    cursor: "pointer"
  },
  message: {
    color: "red"
  }
};

export default StudentDashboard;
