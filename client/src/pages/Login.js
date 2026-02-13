import { useState } from "react";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>ExamGuard</h1>
        <p style={styles.subtitle}>Login to continue</p>

        <input
          style={styles.input}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    background: "#141514",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Segoe UI",
    color: "#d8cec5"
  },

  card: {
    background: "#4e514e",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
    textAlign: "center",
    width: "320px"
  },

  title: {
    marginBottom: "5px"
  },

  subtitle: {
    marginBottom: "20px",
    opacity: 0.8
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "none",
    fontSize: "15px"
  },

  button: {
    width: "100%",
    padding: "10px",
    background: "#86abc5",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "#141514"
  }
};

export default Login;
