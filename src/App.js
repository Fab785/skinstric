import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StartAnalysis from "./pages/StartAnalysis";
import ImageUploadChoice from "./pages/ImageUploadChoice";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Match this path with Hero navigation */}
        <Route path="/start-analysis" element={<StartAnalysis />} />
        <Route path="/upload" element={<ImageUploadChoice />} />
      </Routes>
    </Router>
  );
}

export default App;


