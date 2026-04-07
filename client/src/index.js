import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

/* 🔥 APPLY THEME BEFORE REACT LOADS */
document.body.classList.add("dark");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);