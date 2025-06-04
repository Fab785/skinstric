import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";

const CameraCapture = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      localStorage.setItem("capturedImage", imageSrc);
      navigate("/analysis-overview");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-center">
      {/* Webcam Feed Full Height */}
      <div className="w-[488px] h-[482px] bg-black rounded overflow-hidden relative">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          className="w-full h-full object-contain bg-black"
          videoConstraints={{
            facingMode: "user",
          }}
        />
      </div>

      {/* Instructions */}
      <div className="mt-6 text-center text-white text-sm">
        <p className="uppercase font-medium mb-2">
          To get better results make sure to have
        </p>
        <div className="flex justify-center gap-6 text-xs opacity-80">
          <span>◈ Neutral Expression</span>
          <span>◈ Frontal Pose</span>
          <span>◈ Adequate Lighting</span>
        </div>
      </div>

      {/* Capture Button */}
      <button
        onClick={handleCapture}
        className="mt-6 w-14 h-14 rounded-full bg-white shadow-md border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
      >
        <img src="/camera-icon.svg" alt="Camera" className="w-6 h-6" />
      </button>
    </div>
  );
};

export default CameraCapture;



