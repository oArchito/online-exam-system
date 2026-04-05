import { useEffect, useState } from "react";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dark, setDark] = useState(false);

  // ✅ sync with global theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDark(true);
  }, []);

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

  const current = dark ? darkStyles : styles;

  return (
    <div style={current.page}>
      <div style={current.card}>
        <h1 style={current.title}>ExamGuard</h1>
        <p style={current.subtitle}>Secure Online Examination System</p>
        <p style={current.subtitle}>Please enter your credentials to login. As a teacher, you can create and manage exams. As a student, you can join exams and view results.</p>

        <input
          style={current.input}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={current.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={current.button} onClick={handleLogin}>
          Login
        </button>

        <p style={current.signupText}>
          Don't have an account?{" "}
          <span
            style={current.link}
            onClick={() => (window.location.href = "/signup")}
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}

/* 🌞 LIGHT MODE */
const styles = {
  page: {
    height: "100vh",
    background: "linear-gradient(135deg, #eef2ff, #e0f2fe)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Segoe UI, sans-serif",
    color: "#111"
  },

  card: {
    background: "rgba(255,255,255,0.7)",
    padding: "45px",
    borderRadius: "16px",
    backdropFilter: "blur(12px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
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
    opacity: 0.7,
    fontSize: "14px"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px"
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg, #6366f1, #3b82f6)",
    border: "none",
    borderRadius: "25px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "#fff",
    boxShadow: "0 5px 15px rgba(99,102,241,0.4)",
    transition: "0.3s"
  },

  signupText: {
    marginTop: "18px",
    fontSize: "14px",
    color: "#555"
  },

  link: {
    color: "#3b82f6",
    cursor: "pointer",
    fontWeight: "600"
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
    boxShadow: "0 10px 30px rgba(0,0,0,0.6)"
  },

  input: {
    ...styles.input,
    background: "#1e293b",
    border: "1px solid #334155",
    color: "#fff"
  },

  signupText: {
    ...styles.signupText,
    color: "#ccc"
  },

  link: {
    ...styles.link,
    color: "#60a5fa"
  }
};

export default Login;