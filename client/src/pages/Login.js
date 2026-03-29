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
        <p style={styles.subtitle}>Secure Online Examination System</p>

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
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Segoe UI, sans-serif",
    color: "#fff"
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    padding: "45px",
    borderRadius: "16px",
    backdropFilter: "blur(12px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    textAlign: "center",
    width: "340px"
  },

  title: {
    marginBottom: "5px",
    fontSize: "28px",
    fontWeight: "600"
  },

  subtitle: {
    marginBottom: "25px",
    opacity: 0.8,
    fontSize: "14px"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    fontSize: "14px"
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg, #00c6ff, #0072ff)",
    border: "none",
    borderRadius: "25px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "#fff",
    boxShadow: "0 5px 15px rgba(0,114,255,0.4)",
    transition: "0.3s"
  }
};

export default Login;