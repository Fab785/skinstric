import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCamera, FaImage } from "react-icons/fa";
import RhombusButton from "../UI/RhombusButtons";

export default function ImageUploadChoice() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCameraAccess = () => {
    console.log("Camera access clicked");
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); // Fake loading
  };

  const handleGalleryAccess = () => {
    console.log("Gallery access clicked");
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); // Fake loading
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

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center relative">
        <DiamondBackground />
        <p
          style={{
            fontFamily: "Roobert TRIAL",
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "24px",
            letterSpacing: "-2%",
            textAlign: "center",
            textTransform: "uppercase",
          }}
          className="z-10 text-black"
        >
          PREPARING YOUR ANALYSIS ...
        </p>
      </div>
    );
  }

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

      {/* Center Options */}
      <div className="flex-1 flex items-center justify-center gap-64">
        {/* Camera Section */}
        <div
          className="relative w-64 h-64 flex items-center justify-center cursor-pointer"
          onClick={handleCameraAccess}
        >
          <DiamondBackground />

          {/* Icon */}
          <div className="z-10 w-24 h-24 flex items-center justify-center rounded-full border-2 border-black text-black text-3xl bg-white">
            <FaCamera />
          </div>

          {/* Label */}
          <div className="absolute top-4 right-4 text-xs text-black uppercase text-right leading-tight w-32 z-10">
            ALLOW A.I.
            <br />
            TO SCAN YOUR FACE
          </div>

          {/* Connecting Line */}
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
        </div>

        {/* Gallery Section */}
        <div
          className="relative w-64 h-64 flex items-center justify-center cursor-pointer"
          onClick={handleGalleryAccess}
        >
          <DiamondBackground />

          {/* Icon */}
          <div className="z-10 w-24 h-24 flex items-center justify-center rounded-full border-2 border-black text-black text-3xl bg-white">
            <FaImage />
          </div>

          {/* Label */}
          <div className="absolute bottom-4 left-4 text-xs text-black uppercase text-left leading-tight w-32 z-10">
            ALLOW A.I.
            <br />
            ACCESS GALLERY
          </div>

          {/* Corrected Connecting Line */}
          <div
            className="absolute w-[2px] bg-black z-0"
            style={{
              height: "60px",
              bottom: "45px",
              left: "45px",
              transform: "rotate(45deg)", // Correct direction
              transformOrigin: "bottom left",
            }}
          />
        </div>
      </div>

      {/* Back Button */}
      <div className="absolute bottom-8 left-8">
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <RhombusButton direction="left" label="BACK" />
        </div>
      </div>
    </div>
  );
}





