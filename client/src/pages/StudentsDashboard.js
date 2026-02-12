function StudentDashboard() {

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      <h3>Student Dashboard</h3>

      <button>Join Test by Code</button>
      <br /><br />

      <button>Upload Your Own Test (PDF)</button>
      <br /><br />

      <button>Start Assigned Exam</button>
      <br /><br />

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default StudentDashboard;
