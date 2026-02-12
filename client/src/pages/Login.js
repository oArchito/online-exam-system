import { useState } from "react";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("student");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password
      });

      const backendRole = res.data.user.role;

      // Check if selected role matches backend role
      if (backendRole !== selectedRole && !(backendRole === "admin" && selectedRole === "teacher")) {
        alert("You are not registered as " + selectedRole);
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", backendRole);

      window.location.reload();

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h3>Login</h3>

      <label>
        <input
          type="radio"
          value="student"
          checked={selectedRole === "student"}
          onChange={() => setSelectedRole("student")}
        />
        Student
      </label>

      <label style={{ marginLeft: "10px" }}>
        <input
          type="radio"
          value="teacher"
          checked={selectedRole === "teacher"}
          onChange={() => setSelectedRole("teacher")}
        />
        Teacher
      </label>

      <br /><br />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
