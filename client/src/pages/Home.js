import "../Home.css";
import { useEffect, useState } from "react";

function Home() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDark(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = !dark;
    setDark(newTheme);

    if (newTheme) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const current = dark ? darkStyles : styles;

  return (
    <div style={current.page}>
      {/* NAVBAR */}
      <div style={current.navbar}>
        {/* TEXT LOGO + SLOGAN */}
        <div
          style={{ cursor: "pointer", lineHeight: "1.2" }}
          onClick={() => (window.location.href = "/")}
        >
          <div
            style={{
              ...current.logo,
              fontWeight: "700",
              fontSize: "22px",
            }}
          >
            ExamGuard
          </div>

          <div
            style={{
              fontSize: "10px",
              color: dark ? "#94a3b8" : "#6b7280",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            Secure • Monitor • Evaluate
          </div>
        </div>

        <div>
          {/* 🌗 TOGGLE */}
          <button style={current.toggleBtn} onClick={toggleTheme}>
            {dark ? "🌙" : "☀️"}
          </button>

          <button
            style={current.navBtn}
            onClick={() => (window.location.href = "/login")}
          >
            Student Login
          </button>

          <button
            style={current.navBtn}
            onClick={() => (window.location.href = "/login")}
          >
            Teacher Login
          </button>

          <button
            style={current.navBtn}
            onClick={() => (window.location.href = "/signup")}
          >
            Signup
          </button>
        </div>
      </div>

      {/* HERO */}
      <div style={current.hero}>
        <h1 style={current.title}>
          Secure Online Examination Platform
        </h1>

        <p style={current.subtitle}>
          Timed Exams • Tab Monitoring • Code-Based Access • PDF Practice
        </p>

        <div style={current.buttonGroup}>
          <button
            style={current.primaryBtn}
            onClick={() => (window.location.href = "/signup")}
          >
            Get Started
          </button>

          <button
            style={current.secondaryBtn}
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </button>
        </div>
      </div>

      {/* FEATURES */}
      <div style={current.features}>
        <div style={current.featureCard}>
          ⏱️ Timed Exams
          <p style={current.featureText}>
            Auto submission after time ends
          </p>
        </div>

        <div style={current.featureCard}>
          🚫 Tab Monitoring
          <p style={current.featureText}>
            Prevent cheating via tab switch detection
          </p>
        </div>

        <div style={current.featureCard}>
          📄 PDF Practice
          <p style={current.featureText}>
            Upload PDFs and practice anytime
          </p>
        </div>
      </div>

      {/* ABOUT */}
      <div style={current.about}>
        <h2>About ExamGuard</h2>
        <p>
          ExamGuard is a secure and scalable online examination system designed
          for modern education.
        </p>
      </div>

      {/* FOOTER */}
      <div style={current.footer}>
        <p>Contact: architaggarwal661@gmail.com</p>
        <p>Contact No.: 1234567890</p>
        <p>© 2026 ExamGuard</p>
      </div>
    </div>
  );
}

/* 🌞 LIGHT MODE */
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eef2ff, #e0f2fe)",
    color: "#111",
    fontFamily: "Segoe UI, sans-serif",
    transition: "0.3s",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 40px",
    alignItems: "center",
    backdropFilter: "blur(10px)",
  },

  logo: {
    cursor: "pointer",
  },

  navBtn: {
    marginLeft: "10px",
    padding: "8px 16px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg, #6366f1, #3b82f6)",
    color: "#fff",
  },

  toggleBtn: {
    marginRight: "10px",
    padding: "6px 10px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    background: "#111",
    color: "#fff",
  },

  hero: {
    textAlign: "center",
    marginTop: "100px",
  },

  title: {
    fontSize: "42px",
  },

  subtitle: {
    opacity: 0.7,
  },

  buttonGroup: {
    marginTop: "20px",
  },

  primaryBtn: {
    padding: "14px 28px",
    borderRadius: "30px",
    border: "none",
    marginRight: "10px",
    background: "linear-gradient(135deg, #6366f1, #3b82f6)",
    color: "#fff",
    boxShadow: "0 5px 15px rgba(99,102,241,0.4)",
    cursor: "pointer",
  },

  secondaryBtn: {
    padding: "14px 28px",
    borderRadius: "30px",
    border: "none",
    background: "#ccc",
    color: "#111",
    cursor: "pointer",
  },

  features: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    marginTop: "80px",
    flexWrap: "wrap",
  },

  featureCard: {
    padding: "25px",
    borderRadius: "12px",
    width: "220px",
    textAlign: "center",
    background: "rgba(255,255,255,0.6)",
    backdropFilter: "blur(10px)",
  },

  featureText: {
    fontSize: "14px",
    opacity: 0.8,
  },

  about: {
    marginTop: "80px",
    padding: "40px",
    textAlign: "center",
  },

  footer: {
    textAlign: "center",
    padding: "20px",
    opacity: 0.7,
  },
};

/* 🌙 DARK MODE */
const darkStyles = {
  ...styles,

  page: {
    ...styles.page,
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "#fff",
  },

  secondaryBtn: {
    ...styles.secondaryBtn,
    background: "#334155",
    color: "#fff",
  },

  featureCard: {
    ...styles.featureCard,
    background: "rgba(255,255,255,0.05)",
  },
};

export default Home;