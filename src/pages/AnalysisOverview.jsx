import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RhombusButton from "../UI/RhombusButtons";

export default function AnalysisOverview() {
  const navigate = useNavigate();
  const location = useLocation();
  const imageBase64 = location.state?.imageBase64;

  const [showDotted, setShowDotted] = useState(false);

  // Track window width for scaling
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Base sizes and offsets
  const baseSize = 192;
  const baseOffsets = [
    { label: "Demographics", offsetX: 0, offsetY: -140 },
    { label: "Cosmetic Concerns", offsetX: 140, offsetY: 0 },
    { label: "Weather", offsetX: 0, offsetY: 140 },
    { label: "Skin Type Details", offsetX: -140, offsetY: 0 },
  ];

  // Calculate scale based on window width (adjust breakpoints and scale factor as needed)
  let scale = 1;
  if (windowWidth < 400) scale = 0.4;
  else if (windowWidth < 600) scale = 0.6;
  else if (windowWidth < 900) scale = 0.8;

  const items = baseOffsets.map(({ label, offsetX, offsetY }) => ({
    label,
    offsetX: offsetX * scale,
    offsetY: offsetY * scale,
  }));

  const size = baseSize * scale;

  const handleGetSummary = () => {
    console.log("Proceeding to summary...");
  };

  const handleClick = (label) => {
    if (label === "Demographics") {
      if (!imageBase64) {
        console.warn("No imageBase64 found in state");
        return;
      }
      navigate("/results/demographics", {
        state: { imageBase64 },
      });
    }
  };

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
            A. I. has estimated the following. <br />
            fix estimated information if needed.
          </p>
        </div>
      </div>

      {/* Center Rhombus Section */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* Animated Dotted Rhombuses */}
        {[2.8, 2.6, 2.4].map((scaleFactor, i) => (
          <div
            key={`dotted-${i}`}
            className={`absolute transition-opacity duration-500`}
            style={{
              width: baseSize,
              height: baseSize,
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) rotate(-45deg) scale(${scaleFactor})`,
              zIndex: 0,
              border: "1px dotted",
              borderColor: `rgba(100, 100, 100, ${0.4 - i * 0.1})`,
              borderWidth: "1px",
              opacity: showDotted ? 1 : 0,
              transitionDelay: showDotted
                ? `${i * 120}ms`
                : `${(2 - i) * 120}ms`,
            }}
          />
        ))}

        {/* Inner Gray Rhombuses */}
        {items.map((item, i) => (
          <div
            key={i}
            className="absolute flex items-center justify-center bg-gray-200 text-black hover:bg-gray-300 cursor-pointer transition-colors"
            onClick={() => handleClick(item.label)}
            onMouseEnter={() => setShowDotted(true)}
            onMouseLeave={() => setShowDotted(false)}
            style={{
              width: size,
              height: size,
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
                fontSize: `${14 * scale}px`, // scale font size too
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
