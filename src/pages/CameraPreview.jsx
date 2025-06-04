import React, { useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";

export default function CameraPreview() {
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    navigate("/loading", { state: { imageBase64: imageSrc } });
  }, [navigate]);

  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-center gap-6">
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

      <button
        onClick={capture}
        className="absolute bottom-12 bg-white text-black px-6 py-2 text-sm rounded uppercase shadow-md"
      >
        Take Photo
      </button>
    </div>
  );
}


