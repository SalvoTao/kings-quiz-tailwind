import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";  // <-- Importa il CSS di Tailwind

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);