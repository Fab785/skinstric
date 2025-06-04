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
    <div className="w-screen h-screen bg-black relative">
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

      {/* Top-Left Title */}
      <div className="absolute top-6 left-6 text-white text-sm uppercase tracking-wide">
        <span className="font-semibold">Skinstric</span>{" "}
        <span className="opacity-80">[ analysis ]</span>
      </div>

      {/* Camera Icon Button on Right Center */}
      <button
        onClick={capture}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white text-black p-4 rounded-full shadow-md"
      >
        <FaCamera className="w-6 h-6" />
      </button>

      {/* Bottom Center Instruction */}
      <div className="absolute bottom-6 w-full text-center text-white text-xs uppercase">
        <p className="mb-2 font-medium tracking-wide">
          To get better results make sure to have
        </p>
        <div className="flex justify-center gap-6 opacity-80">
          <span>◈ Neutral Expression</span>
          <span>◈ Frontal Pose</span>
          <span>◈ Adequate Lighting</span>
        </div>
      </div>
    </div>
  );
}







