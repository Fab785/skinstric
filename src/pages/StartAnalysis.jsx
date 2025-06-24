import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RhombusButton from "../UI/RhombusButtons";

export default function StartAnalysis() {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [labelClicked, setLabelClicked] = useState(false);

  const value = step === 1 ? name : location;
  const setValue = step === 1 ? setName : setLocation;
  const label = step === 1 ? "Introduce Yourself" : "Where are you from?";
  const hasText = value.trim().length > 0;

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && hasText) {
      if (step === 1) {
        setStep(2);
        setLabelClicked(false);
        setTimeout(() => inputRef.current?.focus(), 0);
      } else {
        navigate("/upload");
      }
    }
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target) &&
        !e.target.classList.contains("label-clickable")
      ) {
        if (!hasText) setLabelClicked(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [hasText]);

  return (
    <div className="w-full h-screen bg-white relative font-roobert overflow-hidden px-8 py-6 flex flex-col justify-between">
      {/* TOP LABELS */}
      <div>
        <p className="text-[16px] font-medium text-black">
          SKINSTRIC <span className="text-gray-400 font-light">[ INTRO ]</span>
        </p>
        <p className="text-[16px] font-medium text-black mt-10">TO START ANALYSIS</p>
      </div>

      {/* Perfectly Centered Spinning Rhombuses */}
      <div className="absolute top-[30%] left-[35%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
        <div
          className="absolute w-[500px] h-[500px] border border-dotted border-[2px] border-[#E5E7EB] rotate-45 spin-slow max-md:w-[400px] max-md:h-[400px]"
          style={{ top: "40%", left: "40%" }}
        />
        <div
          className="absolute w-[450px] h-[450px] border border-dotted border-[2px] border-[#D1D5DB] rotate-45 spin-slower max-md:w-[350px] max-md:h-[350px]"
          style={{ top: "42%", left: "44%", transform: "translate(-50%, -50%)" }}
        />
        <div
          className="absolute w-[400px] h-[400px] border border-dotted border-[2px] border-[#A0A4AB] rotate-45 spin-slowest max-md:w-[300px] max-md:h-[300px]"
          style={{ top: "42%", left: "44%", transform: "translate(-50%, -50%)" }}
        />
      </div>

      {/* CENTER INPUT with more upward shift */}
      <div className="flex-1 flex items-center justify-center -mt-16">
        <div className="relative w-[300px] h-[160px] mx-auto text-center flex flex-col items-center justify-center">
          {!labelClicked && !hasText && (
            <p className="text-[16px] text-gray-400 uppercase mb-2">CLICK TO TYPE</p>
          )}

          <label
            onClick={() => {
              setLabelClicked(true);
              inputRef.current?.focus();
            }}
            className={`label-clickable absolute left-1/2 transform -translate-x-1/2 cursor-text select-none transition-all duration-300 ease-in-out font-normal whitespace-nowrap ${
              labelClicked || hasText
                ? "top-[8%] text-[16px] uppercase text-gray-400"
                : "top-1/2 -translate-y-1/2 text-[40px] text-black"
            }`}
          >
            {label}
          </label>

          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setLabelClicked(true)}
            onBlur={() => {
              if (!hasText) setLabelClicked(false);
            }}
            className="inline-block bg-transparent border-b border-black outline-none text-[40px] text-black text-center font-normal placeholder-transparent caret-black pt-2 relative z-10"
            style={{ minWidth: "270px", maxWidth: "270px" }}
            spellCheck={false}
          />
        </div>
      </div>

      {/* BACK BUTTON */}
      <div className="absolute bottom-8 left-8 z-10">
        <button onClick={() => navigate("/")} aria-label="Back">
          <RhombusButton direction="left" label="BACK" />
        </button>
      </div>
    </div>
  );
}















