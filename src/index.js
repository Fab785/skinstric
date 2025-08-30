import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Tailwind styles
import App from "./App";
import { HashRouter } from "react-router-dom"; // ✅ Use HashRouter for GitHub Pages

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);


