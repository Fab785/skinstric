import { useNavigate } from "react-router-dom";
import RhombusButton from "../UI/RhombusButtons";

export default function Hero() {
  const navigate = useNavigate();

  const handleTakeTest = () => {
    navigate("/start-analysis");
  };

  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col justify-between bg-white text-black font-roobert">
      {/* Hero Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative text-center z-10">
        <h1 className="text-7xl md:text-8xl font-semibold leading-tight">
          Sophisticated <br /> Skincare
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
        <div className="hidden xl:flex justify-between w-full px-12 absolute top-1/2 transform -translate-y-1/2">
          {/* LEFT */}
          <div className="relative w-[300px] h-[300px] flex items-center justify-center">
            {/* Smaller Half-visible Dotted Diamond */}
            <div className="absolute top-1/2 left-[-250px] transform -translate-y-1/2 w-[400px] h-[400px] border-[2px] border-dotted border-gray-500 rotate-45 opacity-70 pointer-events-none z-0" />

            {/* Button */}
            <div className="relative z-10 ml-[-140px]">
              <RhombusButton direction="left" label="DISCOVER A.I." />
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative w-[300px] h-[300px] flex items-center justify-center">
            {/* Smaller Half-visible Dotted Diamond */}
            <div className="absolute top-1/2 right-[-250px] transform -translate-y-1/2 w-[400px] h-[400px] border-[2px] border-dotted border-gray-500 rotate-45 opacity-70 pointer-events-none z-0" />

            {/* Button */}
            <div className="relative z-10 mr-[-180px]">
              <RhombusButton direction="right" label="TAKE TEST" onClick={handleTakeTest} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-16 left-6 text-xs text-left leading-snug text-black z-10">
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES A <br />
        HIGHLY-PERSONALISED ROUTINE TAILORED TO <br />
        WHAT YOUR SKIN NEEDS.
      </footer>
    </div>
  );
}
































