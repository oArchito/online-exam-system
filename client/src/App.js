import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentsDashboard from "./pages/StudentsDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import ExamPage from "./pages/ExamPage";
import Result from "./pages/Result";
import MyResults from "./pages/MyResults";
import PracticePage from "./pages/PracticePage";
import TeacherResults from "./pages/TeacherResults";
import CreateExam from "./pages/CreateExam";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 🔥 IMPORTANT: handles /login?role=...
  const path = window.location.pathname;

  // =========================
  // NOT LOGGED IN
  // =========================
  if (!token) {
    if (path.startsWith("/login")) return <Login />;
    if (path.startsWith("/signup")) return <Signup />;
    return <Home />;
  }

  // =========================
  // COMMON PAGES
  // =========================
  if (path === "/exam") return <ExamPage />;
  if (path === "/result") return <Result />;
  if (path === "/my-results") return <MyResults />;
  if (path === "/teacher-results") return <TeacherResults />;
  if (path === "/practice") return <PracticePage />;
  if (path === "/create-exam") return <CreateExam />;

  // =========================
  // DASHBOARDS
  // =========================
  if (role === "student") return <StudentsDashboard />;

  // 🔥 IMPORTANT: teacher = admin
  if (role === "admin") return <TeacherDashboard />;

  // fallback
  return <Home />;
}

export default App;