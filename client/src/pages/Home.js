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
      {/* GRID */}
      <div style={grid}></div>

      {/* NAVBAR */}
      <div style={current.navbar}>
        <div
          style={{ cursor: "pointer", lineHeight: "1.2" }}
          onClick={() => (window.location.href = "/")}
        >
          <div style={{ ...current.logo, fontWeight: "700", fontSize: "22px" }}>
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
            style={current.primaryBtn}
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

      {/* 🔥 MODERN FEATURES GRID */}
      <div style={current.featuresWrapper}>
  {features.map((f, i) => (
    <div key={i} style={current.featureBox} className="feature-animate">
      <h3>{f.title}</h3>
      <p>{f.desc}</p>
    </div>
  ))}
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
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <span>📧 architaggarwal661@gmail.com</span>
          <span>📞 1234567890</span>
          <span>© 2026 ExamGuard</span>
        </p>
      </div>
    </div>
  );
}

/* FEATURES */
const features = [
  {
    title: "Timed Exams",
    desc: "Auto submission after time ends",
  },
  {
    title: "Tab Monitoring",
    desc: "Prevent cheating via tab switch detection",
  },
  {
    title: "PDF Practice",
    desc: "Upload PDFs and practice anytime",
  },
  {
    title: "Join via Code",
    desc: "Students join exams using unique code",
  },
  {
    title: "Results Dashboard",
    desc: "Track performance & analytics",
  },
];

/* GRID BACKGROUND */
const grid = {
  position: "absolute",
  width: "100%",
  height: "100%",
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
  backgroundSize: "40px 40px",
  zIndex: 0,
};

/* LIGHT MODE */
const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #e0f2fe, #eef2ff)",
    color: "#111",
    fontFamily: "Inter, sans-serif",
    position: "relative",
    overflow: "hidden",
  },

 navbar: {
  display: "flex",
  justifyContent: "space-between",
  padding: "20px 40px",
  alignItems: "center",

  position: "sticky",
  top: 0,
  zIndex: 1000,

  backdropFilter: "blur(12px)",
  background: "rgba(255,255,255,0.6)",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
},
    

  logo: {
    background: "linear-gradient(90deg, #6366f1, #22d3ee)",
    WebkitBackgroundClip: "text",
    color: "transparent",
  },

  navBtn: {
    marginLeft: "10px",
    padding: "8px 18px",
    borderRadius: "20px",
    border: "1px solid rgba(0,0,0,0.1)",
    background: "transparent",
    color: "#111",
    cursor: "pointer",
  },

  toggleBtn: {
    marginRight: "10px",
    padding: "6px 10px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
  },

  hero: {
    textAlign: "center",
    marginTop: "120px",
    position: "relative",
    zIndex: 2,
  },

  title: {
    fontSize: "52px",
    fontWeight: "800",
    background: "linear-gradient(90deg, #6366f1, #22d3ee)",
    WebkitBackgroundClip: "text",
    color: "transparent",
  },

  subtitle: {
    opacity: 0.7,
  },

  buttonGroup: {
    marginTop: "20px",
  },

  primaryBtn: {
    padding: "12px 24px",
    borderRadius: "20px",
    border: "none",
    background: "linear-gradient(135deg, #6366f1, #22d3ee)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    
  },

  secondaryBtn: {
    padding: "12px 24px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    background: "transparent",
  },

  featuresWrapper: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "25px",
  marginTop: "80px",
  padding: "0 40px",
  position: "relative",
  zIndex: 2,
},

featureBox: {
  padding: "28px",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.15)",
  background: "transparent",
  transition: "0.3s",
},

  icon: {
    fontSize: "28px",
    marginBottom: "10px",
  },

  about: {
    marginTop: "80px",
    padding: "40px",
    textAlign: "center",
  },

  footer: {
    textAlign: "center",
    padding: "20px",
  },
};

/* DARK MODE */
const darkStyles = {
  ...styles,

  page: {
    ...styles.page,
    background: "radial-gradient(circle at top, #0f172a, #020617)",
    color: "#fff",
  },
navbar: {
  ...styles.navbar,
  background: "rgba(2, 6, 23, 0.7)",
},
  navBtn: {
    ...styles.navBtn,
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.2)",
  },

  secondaryBtn: {
    ...styles.secondaryBtn,
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#fff",
  },

 featureBox: {
  ...styles.featureBox,
  border: "1px solid rgba(255,255,255,0.2)",
},
};

export default Home;