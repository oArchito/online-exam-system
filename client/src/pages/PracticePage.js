import { useEffect, useState } from "react";

function PracticePage() {
  const pdfUrl = localStorage.getItem("pdfUrl");
  const duration = localStorage.getItem("practiceDuration");

  const [timeLeft, setTimeLeft] = useState(Number(duration) * 60);

  // DEBUG
  console.log("PDF URL:", pdfUrl);

  // TIMER
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          alert("Time up! Practice ended.");
          window.location.href = "/";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // TAB SWITCH DETECTION
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        alert("Violation detected! Practice ended.");
        window.location.href = "/";
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = ("0" + (timeLeft % 60)).slice(-2);

  return (
    <div style={styles.page}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.title}>Practice Mode</h2>

        <div style={styles.timer}>
          ⏱ {minutes}:{seconds}
        </div>
      </div>

      {/* PDF VIEW */}
      <div style={styles.viewer}>
        {pdfUrl ? (
          <object
            data={
              pdfUrl.startsWith("http")
                ? pdfUrl
                : `http://localhost:5000${pdfUrl}`
            }
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <p style={{ textAlign: "center" }}>
              Cannot display PDF.
              <br />
              <a
                href={
                  pdfUrl.startsWith("http")
                    ? pdfUrl
                    : `http://localhost:5000${pdfUrl}`
                }
                target="_blank"
                rel="noreferrer"
              >
                👉 Open PDF
              </a>
            </p>
          </object>
        ) : (
          <p style={{ textAlign: "center" }}>❌ No PDF Found</p>
        )}
      </div>

    </div>
  );
}

export default PracticePage;

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    padding: "20px",
    fontFamily: "Segoe UI, sans-serif",
    color: "#fff"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    padding: "15px 20px",
    background: "rgba(255,255,255,0.05)",
    borderRadius: "12px"
  },

  title: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "600"
  },

  timer: {
    background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
    padding: "10px 18px",
    borderRadius: "20px",
    fontWeight: "bold"
  },

  viewer: {
    background: "rgba(255,255,255,0.08)",
    borderRadius: "12px",
    padding: "10px",
    height: "85vh"
  }
};