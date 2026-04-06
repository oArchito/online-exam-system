import { useEffect, useState } from "react";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDark(true);
  }, []);

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
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
      <div style={current.grid}></div>
      <div style={current.glow1}></div>
      <div style={current.glow2}></div>

      <div style={current.wrapper}>
        
        {/* LEFT CONTENT */}
        <div style={current.left}>
          <h1 style={current.title}>ExamGuard</h1>
          <h3 style={current.tagline}>Secure • Monitor • Evaluate</h3>

          <div style={current.features}>
            <p>✔ Real-time exam monitoring</p>
            <p>✔ Tab switching detection</p>
            <p>✔ Instant result generation</p>
            <p>✔ Join exams using code</p>
          </div>

          <div style={current.stats}>
            <span>Fast + Secure + Scalable</span>
           
          </div>
        </div>

        {/* RIGHT LOGIN */}
        <div style={current.right}>
          <div style={current.form}>
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
              Login →
            </button>

            <p style={current.signupText}>
              Don’t have an account?{" "}
              <span
                style={current.link}
                onClick={() => (window.location.href = "/signup")}
              >
                Signup
              </span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

/* 🌞 LIGHT */
const styles = {
  page: {
    height: "100vh",
    overflow: "hidden",
    position: "relative",
    fontFamily: "Inter, sans-serif",
    background: "#eef2ff",
  },

  wrapper: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    padding: "0 80px",
    zIndex: 2,
    position: "relative",
  },

  grid: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)",
    backgroundSize: "40px 40px",
  },

  glow1: {
    position: "absolute",
    width: "500px",
    height: "500px",
    background: "#6366f1",
    filter: "blur(140px)",
    opacity: 0.4,
    top: "-100px",
    left: "-100px",
  },

  glow2: {
    position: "absolute",
    width: "500px",
    height: "500px",
    background: "#3b82f6",
    filter: "blur(140px)",
    opacity: 0.4,
    bottom: "-100px",
    right: "-100px",
  },

  left: {
    maxWidth: "400px",
  },

  title: {
    fontSize: "48px",
    fontWeight: "800",
    background: "linear-gradient(90deg, #6366f1, #3b82f6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  tagline: {
    marginTop: "10px",
    opacity: 0.7,
    marginBottom: "30px",
  },

  features: {
    lineHeight: "2",
    fontSize: "15px",
    opacity: 0.8,
  },

  stats: {
    marginTop: "40px",
    display: "flex",
    gap: "20px",
    fontSize: "14px",
    opacity: 0.7,
  },

  right: {
    width: "320px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  input: {
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid rgba(0,0,0,0.1)",
    background: "rgba(255,255,255,0.8)",
    outline: "none",
  },

  button: {
    padding: "14px",
    borderRadius: "30px",
    border: "none",
    background: "linear-gradient(135deg, #6366f1, #3b82f6)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 10px 30px rgba(99,102,241,0.4)",
  },

  signupText: {
    marginTop: "10px",
    fontSize: "14px",
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
    background: "rgba(30,41,59,0.8)",
    border: "1px solid #334155",
    color: "#fff",
  },

  link: {
    ...styles.link,
    color: "#60a5fa",
  },
};

export default Login;