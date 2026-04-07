import { useEffect, useState } from "react";

function PracticePage() {
  const pdfUrl = localStorage.getItem("pdfUrl");
  const duration = localStorage.getItem("practiceDuration");

  const [timeLeft, setTimeLeft] = useState(Number(duration) * 60);
  const [dark, setDark] = useState(false);

  // ✅ theme sync
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDark(true);
  }, []);

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

  // TAB SWITCH
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

  const current = dark ? darkStyles : styles;

  return (
    <div style={current.page}>
      
      {/* HEADER */}
      <div style={current.header}>
        <h2 style={current.title}>Practice Mode</h2>

        <div style={current.timer}>
          ⏱ {minutes}:{seconds}
        </div>
      </div>

      {/* PDF VIEW */}
      <div style={current.viewer}>
        {pdfUrl ? (
          <object
            data={
              pdfUrl.startsWith("http")
                ? pdfUrl
                : `https://online-exam-system-w05s.onrender.com${pdfUrl}`
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
                    : `https://online-exam-system-w05s.onrender.com${pdfUrl}`
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

/* 🌞 LIGHT MODE */
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eef2ff, #e0f2fe)",
    padding: "20px",
    fontFamily: "Segoe UI, sans-serif",
    color: "#111"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    padding: "15px 20px",
    background: "rgba(255,255,255,0.7)",
    borderRadius: "12px"
  },

  title: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "600"
  },

  timer: {
    background: "linear-gradient(135deg, #ef4444, #dc2626)",
    padding: "10px 18px",
    borderRadius: "20px",
    fontWeight: "bold",
    color: "#fff"
  },

  viewer: {
    background: "rgba(255,255,255,0.7)",
    borderRadius: "12px",
    padding: "10px",
    height: "85vh"
  }
};

/* 🌙 DARK MODE */
const darkStyles = {
  ...styles,

  page: {
    ...styles.page,
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "#fff"
  },

  header: {
    ...styles.header,
    background: "rgba(255,255,255,0.05)"
  },

  viewer: {
    ...styles.viewer,
    background: "rgba(255,255,255,0.05)"
  }
};

export default PracticePage;