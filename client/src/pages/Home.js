import "../Home.css";

function Home() {
  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <div style={styles.navbar}>
        <h2
          style={styles.logo}
          onClick={() => (window.location.href = "/")}
        >
          ExamGuard
        </h2>

        <div>
          <button
            style={styles.navBtn}
            onClick={() => (window.location.href = "/login")}
          >
            Student Login
          </button>

          <button
            style={styles.navBtn}
            onClick={() => (window.location.href = "/login")}
          >
            Teacher Login
          </button>

          {/* ✅ NEW SIGNUP BUTTON */}
          <button
            style={styles.navBtn}
            onClick={() => (window.location.href = "/signup")}
          >
            Signup
          </button>
        </div>
      </div>

      {/* HERO */}
      <div style={styles.hero}>
        <h1 style={styles.title}>
          Secure Online Examination Platform
        </h1>

        <p style={styles.subtitle}>
          Timed Exams • Tab Monitoring • Code-Based Access • PDF Practice
        </p>

        <div style={styles.buttonGroup}>
          <button
            style={styles.primaryBtn}
            onClick={() => (window.location.href = "/signup")}
          >
            Get Started
          </button>

          <button
            style={styles.secondaryBtn}
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </button>
        </div>
      </div>

      {/* FEATURES */}
      <div style={styles.features}>
        <div style={styles.featureCard}>
          ⏱️ Timed Exams
          <p style={styles.featureText}>
            Auto submission after time ends
          </p>
        </div>

        <div style={styles.featureCard}>
          🚫 Tab Monitoring
          <p style={styles.featureText}>
            Prevent cheating via tab switch detection
          </p>
        </div>

        <div style={styles.featureCard}>
          📄 PDF Practice
          <p style={styles.featureText}>
            Upload PDFs and practice anytime
          </p>
        </div>
      </div>

      {/* ABOUT */}
      <div style={styles.about}>
        <h2>About ExamGuard</h2>
        <p>
          ExamGuard is a secure and scalable online examination system designed
          for modern education. It ensures integrity using monitoring techniques
          and provides a smooth experience for both students and teachers.
        </p>
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        <p>Contact: archit@example.com</p>
        <p>© 2026 ExamGuard</p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    color: "#fff",
    fontFamily: "Segoe UI, sans-serif"
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)"
  },

  logo: {
    margin: 0,
    cursor: "pointer",
    fontSize: "22px",
    fontWeight: "600"
  },

  navBtn: {
    marginLeft: "10px",
    padding: "8px 16px",
    background: "linear-gradient(135deg, #00c6ff, #0072ff)",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#fff"
  },

  hero: {
    textAlign: "center",
    marginTop: "100px",
    padding: "0 20px"
  },

  title: {
    fontSize: "42px",
    marginBottom: "15px",
    fontWeight: "600"
  },

  subtitle: {
    opacity: 0.8,
    marginBottom: "30px",
    fontSize: "16px"
  },

  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap"
  },

  primaryBtn: {
    padding: "14px 28px",
    fontSize: "16px",
    background: "linear-gradient(135deg, #00c6ff, #0072ff)",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#fff",
    boxShadow: "0 5px 15px rgba(0,114,255,0.4)"
  },

  secondaryBtn: {
    padding: "14px 28px",
    fontSize: "16px",
    background: "rgba(255,255,255,0.1)",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#fff"
  },

  features: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    marginTop: "80px",
    flexWrap: "wrap"
  },

  featureCard: {
    background: "rgba(255,255,255,0.08)",
    padding: "25px",
    borderRadius: "12px",
    width: "220px",
    textAlign: "center",
    backdropFilter: "blur(10px)"
  },

  featureText: {
    marginTop: "10px",
    fontSize: "14px",
    opacity: 0.8
  },

  about: {
    marginTop: "100px",
    padding: "40px",
    textAlign: "center",
    background: "rgba(255,255,255,0.05)"
  },

  footer: {
    textAlign: "center",
    padding: "20px",
    marginTop: "40px",
    fontSize: "14px",
    opacity: 0.7
  }
};

export default Home;