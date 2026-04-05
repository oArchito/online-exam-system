import { useState, useEffect } from "react";
import API from "../services/api";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [dark, setDark] = useState(false);

  // ✅ theme sync
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDark(true);
  }, []);

  const handleSignup = async () => {
    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
        role
      });

      alert("Signup successful");
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  const current = dark ? darkStyles : styles;

  return (
    <div style={current.page}>
      <div style={current.card}>
        <h1 style={current.title}>Create Account</h1>
        <p style={current.subtitle}>Join ExamGuard platform</p>

        <input
          style={current.input}
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        />

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

        <select
          style={current.select}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="admin">Teacher</option>
        </select>

        <button style={current.button} onClick={handleSignup}>
          Signup
        </button>

        <p style={current.loginText}>
          Already have an account?{" "}
          <span
            style={current.link}
            onClick={() => (window.location.href = "/login")}
          >
            Login
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
    padding: "40px",
    borderRadius: "16px",
    backdropFilter: "blur(12px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    textAlign: "center",
    width: "340px"
  },

  title: {
    marginBottom: "5px",
    fontSize: "26px",
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

  select: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    background: "#fff",
    color: "#111",
    cursor: "pointer"
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
    color: "#fff"
  },

  loginText: {
    marginTop: "15px",
    fontSize: "13px",
    opacity: 0.7
  },

  link: {
    color: "#3b82f6",
    cursor: "pointer",
    fontWeight: "bold"
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

  select: {
    ...styles.select,
    background: "#1e293b",
    color: "#fff",
    border: "1px solid #334155"
  },

  loginText: {
    ...styles.loginText,
    color: "#ccc"
  }
};

export default Signup;