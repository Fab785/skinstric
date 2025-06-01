import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RhombusButton from "../UI/RhombusButtons";

export default function StartAnalysis() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [labelClicked, setLabelClicked] = useState(false);

  const value = step === 1 ? name : location;
  const setValue = step === 1 ? setName : setLocation;
  const label = step === 1 ? "Introduce yourself" : "Where are you from?";
  const hasText = value.trim().length > 0;

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && hasText) {
      if (step === 1) {
        setStep(2);
        setLabelClicked(false);
      } else {
        console.log("Submitted:", { name, location });
      }
    }
  };

  const handleLabelClick = () => {
    setLabelClicked(true);
    inputRef.current?.focus();
  };

  // Detect clicks outside input & label area
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        // If input empty, reset labelClicked
        if (!hasText) {
          setLabelClicked(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hasText]);

  return (
    <div className="w-full h-screen flex flex-col justify-between px-8 py-6">
      {/* Top Labels */}
      <div className="text-left uppercase space-y-1">
        <p className="text-[16px] font-normal text-black">SKINSTRIC [ INTRO ]</p>
        <p className="text-[16px] font-normal text-black mt-4">TO START ANALYSIS</p>
      </div>

      {/* Main Input Area */}
      <div className="flex-1 flex items-center justify-center" ref={containerRef}>
        <div className="relative w-full max-w-xl text-center">
          {/* CLICK TO TYPE */}
          {!labelClicked && !hasText && (
            <p className="text-[16px] text-gray-400 uppercase mb-2">CLICK TO TYPE</p>
          )}

          {/* Floating Label */}
          <label
            onClick={handleLabelClick}
            className={`absolute left-1/2 transform -translate-x-1/2 cursor-text transition-all duration-300 ease-in-out font-light whitespace-nowrap ${
              labelClicked || hasText
                ? "-top-8 text-[16px] text-gray-400 uppercase italic"
                : "top-[50%] -translate-y-1/2 text-[40px] text-black"
            }`}
          >
            {label}
          </label>

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus={labelClicked}
            className={`w-full bg-transparent border-b border-black outline-none text-[40px] text-black text-center font-light placeholder-transparent pt-2 ${
              labelClicked ? "caret-black" : "caret-transparent"
            }`}
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














