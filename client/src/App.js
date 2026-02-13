import Home from "./pages/Home";
import Login from "./pages/Login";
import StudentsDashboard from "./pages/StudentsDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import ExamPage from "./pages/ExamPage";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const path = window.location.pathname;

  // Not logged in
  if (!token) {
    if (path === "/login") return <Login />;
    return <Home />;
  }

  // Exam page
  if (path === "/exam") {
    return <ExamPage />;
  }

  // Logged in dashboards
  if (role === "student") return <StudentsDashboard />;
  if (role === "admin" || role === "teacher") return <TeacherDashboard />;

  return <Home />;
}

export default App;
