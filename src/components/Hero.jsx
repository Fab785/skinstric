import { useNavigate } from "react-router-dom";
import { useState } from "react";
import RhombusButton from "../UI/RhombusButtons";

export default function Hero() {
  const navigate = useNavigate();
  const [hoverTarget, setHoverTarget] = useState(null); // 'left' | 'right' | null

  const handleTakeTest = () => {
    navigate("/start-analysis");
  };

  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col justify-between bg-white text-black font-roobert">
      {/* Hero Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative text-center z-10 overflow-hidden">
        <h1
          className={`
            text-7xl md:text-8xl font-semibold leading-tight transition-transform duration-700 ease-in-out
            flex flex-col items-center
          `}
        >
          <span
            className={`
              transition-transform duration-700 ease-in-out
              ${hoverTarget === "left" ? "translate-x-[28vw]" : ""}
              ${hoverTarget === "right" ? "-translate-x-[28vw]" : ""}
            `}
          >
            Sophisticated
          </span>
          <span
            className={`
              transition-transform duration-700 ease-in-out
              ${hoverTarget === "left" ? "translate-x-[34vw]" : ""}
              ${hoverTarget === "right" ? "-translate-x-[34vw]" : ""}
            `}
          >
            Skincare
          </span>
        </h1>

        {/* Mobile button */}
        <div className="flex xl:hidden justify-center mt-10">
          <button
            className="bg-black text-white px-6 py-3 font-medium tracking-wide"
            onClick={handleTakeTest}
          >
            ENTER EXPERIENCE
          </button>
        </div>

        {/* Desktop: Rhombus with Half-Visible Dotted Diamonds */}
        <div className="hidden xl:flex justify-between w-full px-12 absolute top-1/2 transform -translate-y-1/2 pointer-events-none">
          {/* LEFT */}
          <div
            className={`relative w-[300px] h-[300px] flex items-center justify-center transition-opacity duration-500
              ${hoverTarget === "right" ? "opacity-0" : "opacity-100"}
            `}
          >
            {/* Dotted Diamonds */}
            <div className="absolute top-1/2 left-[-250px] transform -translate-y-1/2 w-[400px] h-[400px] border-[2px] border-dotted border-gray-600 rotate-45 opacity-70 pointer-events-none z-0" />
            {hoverTarget === "left" && (
              <>
                <div className="absolute top-1/2 left-[-350px] transform -translate-y-1/2 w-[500px] h-[500px] border-[2px] border-dotted border-gray-500 rotate-45 opacity-40 pointer-events-none z-0" />
                <div className="absolute top-1/2 left-[-450px] transform -translate-y-1/2 w-[600px] h-[600px] border-[2px] border-dotted border-gray-400 rotate-45 opacity-20 pointer-events-none z-0" />
              </>
            )}

            {/* Button */}
            <div
              className="relative z-10 ml-[-140px] pointer-events-auto"
              onMouseEnter={() => setHoverTarget("left")}
              onMouseLeave={() => setHoverTarget(null)}
            >
              <RhombusButton direction="left" label="DISCOVER A.I." />
            </div>
          </div>

          {/* RIGHT */}
          <div
            className={`relative w-[300px] h-[300px] flex items-center justify-center transition-opacity duration-500
              ${hoverTarget === "left" ? "opacity-0" : "opacity-100"}
            `}
          >
            {/* Dotted Diamonds */}
            <div className="absolute top-1/2 right-[-250px] transform -translate-y-1/2 w-[400px] h-[400px] border-[2px] border-dotted border-gray-600 rotate-45 opacity-70 pointer-events-none z-0" />
            {hoverTarget === "right" && (
              <>
                <div className="absolute top-1/2 right-[-350px] transform -translate-y-1/2 w-[500px] h-[500px] border-[2px] border-dotted border-gray-500 rotate-45 opacity-40 pointer-events-none z-0" />
                <div className="absolute top-1/2 right-[-450px] transform -translate-y-1/2 w-[600px] h-[600px] border-[2px] border-dotted border-gray-400 rotate-45 opacity-20 pointer-events-none z-0" />
              </>
            )}

            {/* Button */}
            <div
              className="relative z-10 mr-[-160px] pointer-events-auto"
              onMouseEnter={() => setHoverTarget("right")}
              onMouseLeave={() => setHoverTarget(null)}
            >
              <RhombusButton direction="right" label="TAKE TEST" onClick={handleTakeTest} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-20 left-10 text-xs text-left leading-snug text-black z-10 font-semibold">
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES A <br />
        HIGHLY-PERSONALISED ROUTINE TAILORED TO <br />
        WHAT YOUR SKIN NEEDS.
      </footer>
    </div>
  );
}


































