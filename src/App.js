import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StartAnalysis from "./pages/StartAnalysis";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Home />} />

        {/* Start Analysis route */}
        <Route path="/start-analysis" element={<StartAnalysis />} />
      </Routes>
    </Router>
  );
}

export default App;

