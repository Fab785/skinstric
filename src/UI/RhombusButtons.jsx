import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";

export default function RhombusButton({ direction = "right", label, onClick }) {
  const isLeft = direction === "left";
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex items-center gap-4 group
        ${isLeft ? "flex-row-reverse" : "flex-row"}
        h-[44px] px-4
      `}
      style={{ minWidth: "150px" }}
    >
      {/* Label */}
      <span
        className={`text-black text-[16px] uppercase tracking-wide font-semibold transition-all duration-300 ease-in-out
          ${isHovered ? (isLeft ? "mr-6" : "ml-6") : ""}
        `}
      >
        {label}
      </span>

      {/* Rhombus Container */}
      <div
        className={`
          relative
          flex items-center justify-center
          ${isHovered ? "w-[78px] h-[78px]" : "w-6 h-6"}
          border
          ${isHovered ? "border-[1px]" : "border-2"}
          border-black
          rotate-45
          transition-all duration-300 ease-in-out
        `}
      >
        {/* Inner dotted rhombus */}
        {isHovered && (
          <div
            className="absolute inset-2 pointer-events-none"
            style={{ transform: "rotate(45deg)" }}
          >
            <div
              className="w-full h-full border-2 border-dotted border-black"
              style={{ transform: "rotate(-45deg)" }}
            />
          </div>
        )}

        <FaPlay
          className={`text-black transform
            ${isLeft ? "rotate-[135deg]" : "-rotate-45"}
            transition-transform duration-300 ease-in-out
            ${isHovered ? "text-[16px]" : "text-[8px]"}
          `}
        />
      </div>
    </button>
  );
}







