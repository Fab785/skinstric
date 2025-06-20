import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCamera, FaImage } from "react-icons/fa";
import RhombusButton from "../UI/RhombusButtons";

export default function ImageUploadChoice() {
  const navigate = useNavigate();
  const [showPermissionPopup, setShowPermissionPopup] = useState(false);

  const handleGalleryAccess = () => {
    const dummyImage =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";
    navigate("/loading", { state: { imageBase64: dummyImage } });
  };

  const DiamondBackground = () => (
    <>
      {[180, 240, 300].map((size, i) => (
        <div
          key={i}
          className="absolute border border-dotted border-gray-400"
          style={{
            width: size,
            height: size,
            transform: "rotate(45deg)",
            opacity: 0.3 + i * 0.2,
          }}
        />
      ))}
    </>
  );

  return (
    <div className="w-full h-screen flex flex-col justify-between px-8 py-6 relative">
      {/* Top Text */}
      <div className="text-left uppercase space-y-1">
        <p className="text-[16px] font-normal text-black">
          SKINSTRIC <span className="text-gray-400 font-light">[ INTRO ]</span>
        </p>
        <p className="text-[16px] font-normal text-black mt-4">
          TO START ANALYSIS
        </p>
      </div>

      {/* Center */}
      <div className="flex-1 flex items-center justify-center gap-64 relative">
        {/* CAMERA BUTTON */}
        <div className="relative w-64 h-64 flex items-center justify-center cursor-pointer">
          <DiamondBackground />
          <div
            className="z-10 w-24 h-24 flex items-center justify-center rounded-full border-2 border-black text-black text-3xl bg-white"
            onClick={() => setShowPermissionPopup(true)}
          >
            <FaCamera />
          </div>

          {/* Top-right label */}
          <div className="absolute top-4 right-[-20px] text-xs text-black uppercase text-right leading-tight w-32 z-10">
            ALLOW A.I.
            <br />
            TO SCAN YOUR FACE
          </div>

          {/* Diagonal line */}
          <div
            className="absolute w-[2px] bg-black z-0"
            style={{
              height: "60px",
              top: "45px",
              right: "45px",
              transform: "rotate(45deg)",
              transformOrigin: "top left",
            }}
          />

          {/* POPUP: Ask for permission */}
          {showPermissionPopup && (
            <div className="absolute bg-black text-white text-xs px-4 py-3 rounded shadow z-20 left-[210px] top-[50px] w-48">
              <p className="mb-2 uppercase">Allow A.I. to access your camera</p>
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => navigate("/setting-up-camera")}
                  className="text-xs uppercase bg-white text-black px-3 py-1 rounded"
                >
                  Allow
                </button>
                <button
                  onClick={() => setShowPermissionPopup(false)}
                  className="text-xs uppercase text-gray-400"
                >
                  Deny
                </button>
              </div>
            </div>
          )}
        </div>

        {/* GALLERY BUTTON */}
        <div
          className={`relative w-64 h-64 flex items-center justify-center cursor-pointer ${
            showPermissionPopup ? "opacity-40 pointer-events-none" : ""
          }`}
          onClick={handleGalleryAccess}
        >
          <DiamondBackground />
          <div className="z-10 w-24 h-24 flex items-center justify-center rounded-full border-2 border-black text-black text-3xl bg-white">
            <FaImage />
          </div>
          <div className="absolute bottom-4 left-4 text-xs text-black uppercase text-left leading-tight w-32 z-10">
            ALLOW A.I.
            <br />
            ACCESS GALLERY
          </div>
          <div
            className="absolute w-[2px] bg-black z-0"
            style={{
              height: "60px",
              bottom: "45px",
              left: "45px",
              transform: "rotate(45deg)",
              transformOrigin: "bottom left",
            }}
          />
        </div>
      </div>

      {/* BACK BUTTON */}
      <div className="absolute bottom-8 left-8">
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <RhombusButton direction="left" label="BACK" />
        </div>
      </div>
    </div>
  );
}













