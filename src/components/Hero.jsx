import { useNavigate } from "react-router-dom";
import RhombusButton from "../UI/RhombusButtons";

export default function Hero() {
  const navigate = useNavigate();

  const handleTakeTest = () => {
    navigate("/start-analysis");
  };

  return (
    <div className="relative h-screen w-full bg-white text-black overflow-hidden flex flex-col justify-between px-4">
      {/* Hero Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl md:text-6xl font-semibold leading-tight">
          Sophisticated <br /> Skincare
        </h1>

        {/* Mobile CTA */}
        <div className="flex xl:hidden justify-center mt-6">
          <button
            className="bg-black text-white px-6 py-3 font-medium tracking-wide"
            onClick={handleTakeTest}
          >
            ENTER EXPERIENCE
          </button>
        </div>

        {/* Rhombus Buttons for Desktop */}
        <div className="hidden xl:flex justify-between w-full px-8 absolute top-1/2 transform -translate-y-1/2">
          <RhombusButton direction="left" label="DISCOVER A.I." />
          <RhombusButton direction="right" label="TAKE TEST" onClick={handleTakeTest} />
        </div>
      </div>

      {/* Footer - moved higher with more padding */}
      <footer className="text-xs text-left leading-snug text-black px-2 pb-20">
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES A <br />
        HIGHLY-PERSONALISED ROUTINE TAILORED TO <br />
        WHAT YOUR SKIN NEEDS.
      </footer>
    </div>
  );
}

























