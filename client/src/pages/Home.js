function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Online Exam System</h1>

        <button
          style={styles.button}
          onClick={() => (window.location.href = "/login?role=student")}
        >
          Login as Student
        </button>

        <button
          style={styles.button}
          onClick={() => (window.location.href = "/login?role=teacher")}
        >
          Login as Teacher
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8"
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center"
  },
  button: {
    display: "block",
    width: "200px",
    margin: "10px auto",
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer"
  }
};

export default Home;
