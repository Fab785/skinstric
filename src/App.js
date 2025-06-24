import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import StartAnalysis from "./pages/StartAnalysis";
import ImageUploadChoice from "./pages/ImageUploadChoice";
import LoadingPage from "./pages/LoadingPage";
import AnalysisOverview from "./pages/AnalysisOverview";
import DemographicsResults from "./pages/DemographicsResults";
import SettingUpCamera from "./pages/SettingUpCamera";
import CameraPreview from "./pages/CameraPreview";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start-analysis" element={<StartAnalysis />} />
        <Route path="/upload" element={<ImageUploadChoice />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/analysis-overview" element={<AnalysisOverview />} />
        <Route path="/results/demographics" element={<DemographicsResults />} />
        <Route path="/setting-up-camera" element={<SettingUpCamera />} />
        <Route path="/camera-preview" element={<CameraPreview />} />
      </Routes>
    </Router>
  );
}

export default App;








