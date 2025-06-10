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
  const [inputFocused, setInputFocused] = useState(false);

  const value = step === 1 ? name : location;
  const setValue = step === 1 ? setName : setLocation;
  const label = step === 1 ? "Introduce Yourself" : "Where are you from?";
  const hasText = value.trim().length > 0;

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && hasText) {
      if (step === 1) {
        setStep(2);
        setLabelClicked(false);
        setInputFocused(false);
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      } else {
        navigate("/upload");
      }
    }
  };

  const handleLabelClick = () => {
    setLabelClicked(true);
    inputRef.current?.focus();
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        !event.target.classList.contains("label-clickable")
      ) {
        if (!hasText) {
          setLabelClicked(false);
        }
        setInputFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hasText]);

  return (
    <div className="w-full h-screen flex flex-col justify-between px-8 py-6 font-roobert">
      {/* Top Labels */}
      <div className="text-left">
        <p className="text-[16px] font-medium text-black">
          <span className="text-black">SKINSTRIC</span>{" "}
          <span className="text-gray-400 font-light">[ INTRO ]</span>
        </p>
        <p className="text-[16px] font-medium text-black mt-10">
          TO START ANALYSIS
        </p>
      </div>

      {/* Input Area */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-full max-w-xl text-center">
          {/* Centered Dotted Rhombuses */}
          <div className="absolute left-[23%] top-[-60%] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
            <div className="absolute w-[320px] h-[320px] border-2 border-dotted border-gray-600 rotate-45" />
            <div className="absolute w-[400px] h-[400px] border-2 border-dotted border-gray-500 rotate-45 top-[-40px] left-[-40px]" />
            <div className="absolute w-[480px] h-[480px] border-2 border-dotted border-gray-400 rotate-45 top-[-80px] left-[-80px]" />
          </div>

          {!labelClicked && !hasText && (
            <p className="text-[16px] text-gray-400 uppercase mb-2">
              CLICK TO TYPE
            </p>
          )}

          <label
            onClick={handleLabelClick}
            className={`label-clickable absolute left-1/2 transform -translate-x-1/2 cursor-text select-none transition-all duration-300 ease-in-out font-normal whitespace-nowrap ${
              labelClicked || hasText
                ? "top-[-2rem] text-[16px] uppercase text-gray-400"
                : "top-[50%] -translate-y-1/2 text-[40px] text-black"
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
            onFocus={() => {
              setInputFocused(true);
              setLabelClicked(true);
            }}
            onBlur={() => {
              setInputFocused(false);
              if (!hasText) setLabelClicked(false);
            }}
            className="w-full bg-transparent border-b border-black outline-none text-[40px] text-black text-center font-normal placeholder-transparent caret-black pt-2 relative z-10"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Back Button */}
      <div className="absolute bottom-8 left-8">
        <button
          onClick={() => navigate("/")}
          className="cursor-pointer focus:outline-none"
          aria-label="Back"
        >
          <RhombusButton direction="left" label="BACK" />
        </button>
      </div>
    </div>
  );
}






















