import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RhombusButton from "../UI/RhombusButtons";

export default function StartAnalysis() {
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Focus on input when component mounts
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  // Handle back navigation
  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="relative h-screen w-full bg-white px-8 py-6 font-roobert">
      {/* Top-Left Label */}
      <div className="absolute top-6 left-6 text-black uppercase text-[14px] leading-[22px] font-normal">
        <span>SKINSTRIC</span> <span className="text-gray-400">[ INTRO ]</span>
      </div>

      {/* Centered Input */}
      <div className="flex flex-col items-center justify-center h-full text-center -mt-16">
        <p className="text-gray-400 text-sm mb-2 tracking-wide">CLICK TO TYPE</p>
        <input
          ref={inputRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Introduce Yourself"
          className="text-black bg-transparent border-none outline-none text-[28px] font-light text-center placeholder-black tracking-wide"
        />
      </div>

      {/* Bottom-Left BACK Button */}
      <div className="absolute bottom-6 left-6" onClick={handleBackClick}>
        <RhombusButton direction="left" label="BACK" />
      </div>
    </div>
  );
}
