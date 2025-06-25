import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";

export default function RhombusButton({ direction = "right", label, onClick }) {
  const isLeft = direction === "left";
  const [isHovered, setIsHovered] = useState(false);

  // Disable hover effects for BACK and PROCEED buttons
  const lowerLabel = label?.toLowerCase?.() || "";
  const disableHover = lowerLabel === "back" || lowerLabel === "proceed" || lowerLabel === "get summary";

  const shouldHover = !disableHover && isHovered;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => !disableHover && setIsHovered(true)}
      onMouseLeave={() => !disableHover && setIsHovered(false)}
      style={{ minWidth: "150px" }}
      className={`flex items-center gap-4 px-4 h-[44px] ${
        isLeft ? "flex-row-reverse" : "flex-row"
      } group cursor-pointer select-none`}
      aria-label={label}
    >
      {/* Label */}
      <span
        className={`text-black text-[16px] uppercase tracking-wide font-semibold transition-all duration-300 ease-in-out ${
          shouldHover ? (isLeft ? "mr-6" : "ml-6") : ""
        } ${!disableHover ? "group-hover:underline" : ""}`}
      >
        {label}
      </span>

      {/* Rhombus */}
      <div
        className={`relative transform rotate-45 transition-all duration-300 ease-in-out ${
          shouldHover ? "w-[78px] h-[78px] border border-black" : "w-6 h-6 border-2 border-black"
        } flex items-center justify-center`}
      >
        {/* Inner dotted rhombus */}
        {shouldHover && (
          <div
            className="absolute inset-2 rotate-45"
            style={{ transform: "rotate(45deg)" }}
          >
            <div
              className="w-full h-full border-2 border-dotted border-black"
              style={{ transform: "rotate(-45deg)" }}
            />
          </div>
        )}

        <FaPlay
          className={`text-black transition-transform duration-300 ease-in-out ${
            isLeft ? "rotate-[135deg]" : "-rotate-45"
          } ${shouldHover ? "text-[16px]" : "text-[8px]"}`}
        />
      </div>
    </button>
  );
}








