import React from "react";
import { useNavigate } from "react-router-dom";
import RhombusButton from "../UI/RhombusButtons";

export default function AnalysisOverview() {
  const navigate = useNavigate();

  const handleGetSummary = () => {
    console.log("Proceeding to summary...");
  };

  const items = [
    { label: "Demographics", offsetX: 0, offsetY: -90 },
    { label: "Cosmetic Concerns", offsetX: 90, offsetY: 0 },
    { label: "Weather", offsetX: 0, offsetY: 90 },
    { label: "Skin Type Details", offsetX: -90, offsetY: 0 },
  ];

  return (
    <div className="w-full h-screen flex flex-col justify-between px-8 py-6 relative font-[Roobert TRIAL]">
      {/* Top Left Text */}
      <div className="text-left uppercase space-y-3">
        <p className="text-[16px] font-normal text-black">
          SKINSTRIC <span className="text-gray-400 font-light">[ ANALYSIS ]</span>
        </p>
        <div className="mt-4 space-y-1">
          <p className="text-[16px] font-semibold text-black uppercase tracking-tight">
            A. I. Analysis
          </p>
          <p className="text-[14px] font-normal text-black uppercase tracking-tight leading-6 w-[336px]">
            A. I. has estimated the following. Fix estimated information if needed.
          </p>
        </div>
      </div>

      {/* Center Rhombus Section */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* Outer Big Rhombus */}
        <div
          className="absolute bg-transparent border border-gray-400"
          style={{
            width: 314,
            height: 314,
            transform: "rotate(-45deg)",
            zIndex: 1,
          }}
        />

        {/* Inner Rhombuses */}
        {items.map((item, i) => (
          <div
            key={i}
            className="absolute flex items-center justify-center bg-gray-200 hover:bg-gray-300 cursor-pointer text-black transition-colors duration-200"
            style={{
              width: 120,
              height: 120,
              top: `calc(50% + ${item.offsetY}px)`,
              left: `calc(50% + ${item.offsetX}px)`,
              transform: "translate(-50%, -50%) rotate(-45deg)",
              zIndex: 2,
            }}
          >
            <span
              style={{
                transform: "rotate(45deg)",
                fontFamily: "Roobert TRIAL",
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "20px",
                letterSpacing: "-2%",
                textAlign: "center",
                textTransform: "uppercase",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "4px",
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-between px-2 pb-2">
        <div onClick={() => navigate("/upload")} className="cursor-pointer">
          <RhombusButton direction="left" label="BACK" />
        </div>
        <div onClick={handleGetSummary} className="cursor-pointer flex items-center gap-2">
          <span className="uppercase font-semibold text-sm">Get Summary</span>
          <RhombusButton direction="right" />
        </div>
      </div>
    </div>
  );
}



