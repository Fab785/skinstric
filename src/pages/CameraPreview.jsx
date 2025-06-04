import React, { useRef, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import Webcam from "react-webcam";

export default function CameraPreview() {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setShowMessage(true);

    setTimeout(() => {
      navigate("/loading", { state: { imageBase64: imageSrc } });
    }, 1500);
  }, [navigate]);

  return (
    <div className="w-screen h-screen bg-[#D9D9D9] relative overflow-hidden">
      {/* Header top-left */}
      <div className="absolute top-6 left-6 text-white text-sm font-semibold uppercase tracking-wide">
        Skinstric [ analysis ]
      </div>

      {/* Webcam */}
      <div className="w-full h-full">
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
      </div>

      {/* GREAT SHOT! message */}
      {showMessage && (
        <div className="absolute top-24 w-full text-center text-[#FCFCFC] text-[14px] font-semibold uppercase tracking-wider">
          GREAT SHOT!
        </div>
      )}

      {/* Camera icon button - right center */}
      <button
        onClick={capture}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 p-4 rounded-full text-white"
      >
        <FaCamera size={20} />
      </button>

      {/* Bottom helper text */}
      <div className="absolute bottom-12 w-full text-center text-white text-xs opacity-80">
        <p className="mb-1">TO GET BETTER RESULTS MAKE SURE TO HAVE</p>
        <p className="space-x-4">
          <span>◉ NEUTRAL EXPRESSION</span>
          <span>◉ FRONTAL POSE</span>
          <span>◉ ADEQUATE LIGHTING</span>
        </p>
      </div>
    </div>
  );
}








