import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentsDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Login />;
  }

  if (role === "student") {
    return <StudentDashboard />;
  }

  if (role === "admin" || role === "teacher") {
    return <TeacherDashboard />;
  }

  return <Login />;
}

export default App;
