import React, { useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { FaCamera } from "react-icons/fa";

export default function CameraPreview() {
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    navigate("/loading", { state: { imageBase64: imageSrc } });
  }, [navigate]);

  return (
    <div className="w-screen h-screen bg-black relative overflow-hidden">
      {/* Fullscreen Webcam */}
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-full h-full object-cover"
        videoConstraints={{
          facingMode: "user",
          width: 1280,
          height: 720,
        }}
      />

      {/* Camera Icon Button (Middle Right Side) */}
      <button
        onClick={capture}
        className="absolute right-10 top-1/2 -translate-y-1/2 bg-white rounded-full p-4 shadow-lg hover:scale-105 transition-transform"
      >
        <FaCamera className="w-6 h-6 text-black" />
      </button>
    </div>
  );
}





