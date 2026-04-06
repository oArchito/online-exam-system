import { useState, useEffect } from "react";
import API from "../services/api";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [dark, setDark] = useState(false);

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
        role,
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
      
      {/* BACKGROUND ELEMENTS */}
      <div style={current.grid}></div>
      <div style={current.glow}></div>

      <div style={current.container}>
        
        {/* LEFT SIDE INFO */}
        <div style={current.side}>
          <h2 style={current.sideTitle}>ExamGuard</h2>
          <p style={current.sideText}>
            Secure • Monitor • Evaluate
          </p>
        </div>

        {/* FORM */}
        <div style={current.formBox}>
          <h1 style={current.title}>Create Account</h1>
          <p style={current.subtitle}>Join ExamGuard</p>

          <div style={current.form}>

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
              type="password"
              style={current.input}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* FIXED DROPDOWN */}
            <select
              style={current.select}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="admin">Teacher</option>
            </select>

            <button style={current.button} onClick={handleSignup}>
              Signup →
            </button>
          </div>

          <div style={current.divider}></div>

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
    </div>
  );
}

/* 🌞 LIGHT */
const styles = {
  page: {
    minHeight: "100vh",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Inter, sans-serif",
    overflow: "hidden",
    background: "#eef2ff",
  },

  grid: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)",
    backgroundSize: "40px 40px",
  },

  glow: {
    position: "absolute",
    width: "600px",
    height: "600px",
    background: "radial-gradient(circle, #6366f1, transparent)",
    filter: "blur(120px)",
    opacity: 0.4,
  },

  container: {
    display: "flex",
    gap: "60px",
    alignItems: "center",
    zIndex: 2,
  },

  side: {
    maxWidth: "260px",
  },

  sideTitle: {
    fontSize: "28px",
    fontWeight: "700",
  },

  sideText: {
    opacity: 0.6,
    marginTop: "10px",
  },

  formBox: {
    width: "340px",
  },

  title: {
    fontSize: "34px",
    fontWeight: "800",
  },

  subtitle: {
    marginBottom: "20px",
    opacity: 0.7,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  input: {
    width: "100%",
    padding: "13px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },

  select: {
    width: "100%", // ✅ FIXED
    padding: "13px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    boxSizing: "border-box", // ✅ IMPORTANT
  },

  button: {
    padding: "14px",
    borderRadius: "25px",
    border: "none",
    background: "linear-gradient(135deg, #6366f1, #3b82f6)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },

  divider: {
    height: "1px",
    background: "rgba(0,0,0,0.1)",
    margin: "20px 0",
  },

  loginText: {
    fontSize: "14px",
    textAlign: "center",
  },

  link: {
    color: "#3b82f6",
    cursor: "pointer",
    fontWeight: "600",
  },
};

/* 🌙 DARK */
const darkStyles = {
  ...styles,

  page: {
    ...styles.page,
    background: "#020617",
    color: "#fff",
  },

  grid: {
    ...styles.grid,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
  },

  input: {
    ...styles.input,
    background: "#1e293b",
    border: "1px solid #334155",
    color: "#fff",
  },

  select: {
    ...styles.select,
    background: "#1e293b",
    border: "1px solid #334155",
    color: "#fff",
  },
};

export default Signup;