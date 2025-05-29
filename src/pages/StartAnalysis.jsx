import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RhombusButton from "../UI/RhombusButtons";

export default function StartAnalysis() {
  const [step, setStep] = useState(1); // Step 1: Name, Step 2: Location
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [step]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (step === 1 && name.trim()) {
        setStep(2);
      } else if (step === 2 && location.trim()) {
        // Final submit logic here
        console.log({ name, location });
      }
    }
  };

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="relative h-screen w-full bg-white px-8 py-6 font-roobert">
      {/* Top Left */}
      <div className="absolute top-6 left-6 text-black font-normal leading-[22px]">
        <div className="uppercase text-[14px]">
          SKINSTRIC <span className="text-gray-400">[ INTRO ]</span>
        </div>
        <div className="uppercase text-[14px] mt-4">TO START ANALYSIS</div>
      </div>

      {/* Center Input */}
      <div className="flex flex-col items-center justify-center h-full text-center -mt-16">
        <div className="relative w-full max-w-md">
          <label
            className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 ${
              (step === 1 ? name : location)
                ? "top-[-32px] text-[12px] text-black"
                : "top-[2px] text-sm text-gray-400"
            }`}
          >
            {(step === 1 ? name : location)
              ? step === 1
                ? "Introduce Yourself"
                : "Where are you from?"
              : "CLICK TO TYPE"}
          </label>

          <input
            ref={inputRef}
            type="text"
            value={step === 1 ? name : location}
            onChange={(e) =>
              step === 1 ? setName(e.target.value) : setLocation(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder={
              (step === 1 ? name : location)
                ? ""
                : step === 1
                ? "Introduce Yourself"
                : "Where are you from?"
            }
            className="w-full text-black bg-transparent border-none outline-none text-[28px] font-light text-center placeholder-black tracking-wide mt-4"
          />
        </div>
      </div>

      {/* Bottom Left Back Button */}
      <div className="absolute bottom-6 left-6" onClick={handleBackClick}>
        <RhombusButton direction="left" label="BACK" />
      </div>
    </div>
  );
}
