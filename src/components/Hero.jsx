import { useNavigate } from "react-router-dom";
import RhombusButton from "../UI/RhombusButtons";

export default function Hero() {
  const navigate = useNavigate();

  const handleTakeTest = () => {
    navigate("/start-analysis"); // matches App.js route
  };

  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col justify-between bg-white text-black">
      {/* Hero Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative text-center">
        <h1 className="text-5xl md:text-6xl font-semibold leading-tight">
          Sophisticated <br /> Skincare
        </h1>

        {/* ENTER EXPERIENCE (Mobile only) */}
        <div className="flex xl:hidden justify-center mt-10">
          <button
            className="bg-black text-white px-6 py-3 font-medium tracking-wide"
            onClick={handleTakeTest}
          >
            ENTER EXPERIENCE
          </button>
        </div>

        {/* Rhombus Buttons (Desktop only) */}
        <div className="hidden xl:flex justify-between w-full px-8 absolute top-1/2 transform -translate-y-1/2">
          <RhombusButton direction="left" label="DISCOVER A.I." />
          <RhombusButton direction="right" label="TAKE TEST" onClick={handleTakeTest} />
        </div>
      </div>

      {/* Footer */}
      <footer className="px-8 pb-8 text-xs text-left leading-snug">
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES A <br />
        HIGHLY-PERSONALISED ROUTINE TAILORED TO <br />
        WHAT YOUR SKIN NEEDS.
      </footer>
    </div>
  );
}




















