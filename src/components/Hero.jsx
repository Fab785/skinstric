import React from "react";
import { useNavigate } from "react-router-dom";
import RhombusButton from "../UI/RhombusButtons";

export default function Hero() {
  const navigate = useNavigate();

  const handleTakeTestClick = () => {
    navigate("/start-analysis");
  };

  return (
    <section className="relative h-[calc(100vh-4rem)] w-full flex items-center justify-center">
      {/* Center Title */}
      <div className="text-center -translate-y-12">
        <h1 className="font-roobert text-hero leading-hero tracking-hero font-light">
          Sophisticated<br />Skincare
        </h1>
      </div>

      {/* Left Button */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2">
        <RhombusButton direction="left" label="DISCOVER A.I." />
      </div>

      {/* Right Button */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2">
        <RhombusButton
          direction="right"
          label="TAKE TEST"
          onClick={handleTakeTestClick}
        />
      </div>

      {/* Bottom Left Text */}
      <div className="absolute bottom-8 left-8 uppercase text-[14px] leading-[24px] font-normal text-black max-w-xs">
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES A<br />
        HIGHLY-PERSONALISED ROUTINE TAILORED TO<br />
        WHAT YOUR SKIN NEEDS.
      </div>
    </section>
  );
}


















