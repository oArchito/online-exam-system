import "../Home.css";

function Home() {
  return (
    <div style={styles.page}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h2
  style={styles.logo}
  onClick={() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/";
    } else if (role === "student") {
      window.location.href = "/";
    } else {
      window.location.href = "/";
    }
  }}
>
  ExamGuard
</h2>

        <div>
          <button style={styles.navBtn} onClick={() => window.location.href = "/login?role=student"}>
            Student Login
          </button>
          <button style={styles.navBtn} onClick={() => window.location.href = "/login?role=teacher"}>
            Teacher Login
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.title}>Secure Online Examination Platform</h1>
        <p style={styles.subtitle}>
          Timed Exams • Tab Monitoring • Code-Based Access • Self Practice
        </p>

        <div style={styles.buttonGroup}>
          <button
            style={styles.primaryBtn}
            onClick={() => window.location.href = "/login?role=student"}
          >
            Login as Student
          </button>

          <button
            style={styles.primaryBtn}
            onClick={() => window.location.href = "/login?role=teacher"}
          >
            Login as Teacher
          </button>
        </div>
      </div>

      {/* About Section */}
      <div style={styles.about}>
        <h2>About ExamGuard</h2>
        <p>
          ExamGuard is a secure online examination system that allows teachers
          to create timed tests and students to attempt them with real-time
          monitoring. It also provides self-practice mode using uploaded PDFs.
        </p>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p>Contact: archit@example.com</p>
        <p>Instagram: @examguard</p>
        <p>© 2026 ExamGuard</p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#141514",
    color: "#d8cec5",
    minHeight: "100vh",
    fontFamily: "Segoe UI"
  },

  navbar: {
    background: "#4e514e",
    padding: "15px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  logo: {
    margin: 0
  },

  navBtn: {
    marginLeft: "10px",
    padding: "8px 14px",
    background: "#86abc5",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#141514"
  },

  hero: {
    textAlign: "center",
    marginTop: "80px"
  },

  title: {
    fontSize: "38px",
    marginBottom: "15px"
  },

  subtitle: {
    opacity: 0.8,
    marginBottom: "30px"
  },

  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "20px"
  },

  primaryBtn: {
    padding: "14px 24px",
    fontSize: "16px",
    background: "#86abc5",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#141514",
    transition: "0.2s"
  },

  about: {
    marginTop: "120px",
    padding: "40px",
    textAlign: "center",
    background: "#4e514e"
  },
  logo: {
  margin: 0,
  cursor: "pointer"
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
