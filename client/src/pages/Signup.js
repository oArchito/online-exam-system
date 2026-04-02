import { useState } from "react";
import API from "../services/api";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

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

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>Join ExamGuard platform</p>

        <input
          style={styles.input}
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        />

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

        <select
  style={styles.select}
  value={role}
  onChange={(e) => setRole(e.target.value)}
>
  <option value="student">Student</option>
  <option value="admin">Teacher</option>
</select>

        <button style={styles.button} onClick={handleSignup}>
          Signup
        </button>

        <p style={styles.loginText}>
          Already have an account?{" "}
          <span
            style={styles.link}
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </span>
        </p>
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
    padding: "40px",
    borderRadius: "16px",
    backdropFilter: "blur(12px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
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
  },

  loginText: {
    marginTop: "15px",
    fontSize: "13px",
    opacity: 0.8
  },

  link: {
    color: "#00c6ff",
    cursor: "pointer",
    fontWeight: "bold"
  },
  select: {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "none",
  outline: "none",
  fontSize: "14px",
  background: "rgba(231, 224, 224, 0.56)",
  color: "#030c2f",
  appearance: "none", // removes default arrow
  cursor: "pointer"
}
};

export default Signup;