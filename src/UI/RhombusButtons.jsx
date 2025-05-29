import React from "react";
import { FaPlay } from "react-icons/fa";

export default function RhombusButton({ direction = "right", label, onClick }) {
  const isLeft = direction === "left";

  return (
    <button
      onClick={onClick}
      className={`w-[150px] h-[44px] flex items-center ${
        isLeft ? "flex-row-reverse" : "flex-row"
      } gap-4 group`}
    >
      {/* Label */}
      <span className="text-black text-[16px] uppercase tracking-wide font-semibold group-hover:underline">
        {label}
      </span>

      {/* Rhombus Container */}
      <div className="w-6 h-6 border-2 border-black transform rotate-45 flex items-center justify-center">
        <FaPlay
          className={`text-black text-[8px] transform ${
            isLeft ? "rotate-[135deg]" : "-rotate-45"
          }`}
        />
      </div>
    </button>
  );
}



