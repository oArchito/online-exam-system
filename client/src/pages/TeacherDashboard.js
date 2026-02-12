function TeacherDashboard() {
  return (
    <div>
      <h3>Teacher Dashboard</h3>

      <button>Create Test</button>
      <br /><br />

      <button>View Student Attempts</button>
        <br /><br />
        <button onClick={logout}>Logout</button>

    </div>
  );
}
const logout = () => {
  localStorage.clear();
  window.location.reload();
};


export default TeacherDashboard;
