import React from "react";

export default function Header() {
  return (
    <header className="flex items-center px-8 justify-between h-16">
      <div className="font-bold text-black text-[14px]">
        SKINSTRIC{" "}
        <span className="ml-2 text-skinstric-gray-light text-[10px]">
          [ INTRO ]
        </span>
      </div>

      <button className="bg-black text-white text-[10px] px-4 py-2">
        ENTER CODE
      </button>
    </header>
  );
}



