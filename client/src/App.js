import Home from "./pages/Home";
import Login from "./pages/Login";
import StudentsDashboard from "./pages/StudentsDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import ExamPage from "./pages/ExamPage";
import Result from "./pages/Result";
import MyResults from "./pages/MyResults";
import PracticePage from "./pages/PracticePage";
import TeacherResults from "./pages/TeacherResults";
import CreateExam from "./pages/CreateExam"; // or components if stored there

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const path = window.location.pathname;

  // Not logged in
  if (!token) {
    if (path === "/login") return <Login />;
    return <Home />;
  }

  // Pages
  if (path === "/exam") return <ExamPage />;
  if (path === "/result") return <Result />;
  if (path === "/my-results") return <MyResults />;
  if (path === "/teacher-results") return <TeacherResults />;
  if (path === "/practice") return <PracticePage />; // ✅ FIXED (moved inside)
if (path === "/create-exam") return <CreateExam />;
  // Dashboards
  if (role === "student") return <StudentsDashboard />;
  if (role === "admin" || role === "teacher") return <TeacherDashboard />;

  return <Home />;
}

export default App;